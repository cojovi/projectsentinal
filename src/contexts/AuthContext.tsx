import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signOut: () => Promise<void>
  updateUserRole: (userId: string, newRole: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Environment variable guards for different frameworks
const getEnvVar = (key: string): string | undefined => {
  try {
    // Try Vite environment variables first
    return import.meta.env[key]
  } catch (error) {
    try {
      // Fall back to Next.js/Node.js environment variables
      return process.env[key]
    } catch (fallbackError) {
      console.warn(`Failed to access environment variable ${key}:`, fallbackError)
      return undefined
    }
  }
}

// Check if Supabase is properly configured
const isSupabaseConfigured = (): boolean => {
  const url = getEnvVar('VITE_SUPABASE_URL')
  const key = getEnvVar('VITE_SUPABASE_ANON_KEY')
  
  return !!(
    url && 
    key && 
    url !== 'your_supabase_url_here' && 
    key !== 'your_supabase_anon_key_here' &&
    !url.includes('placeholder') &&
    !key.includes('placeholder')
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  // Initialize authentication - Simplified and bulletproof
  useEffect(() => {
    let mounted = true
    let authSubscription: any = null

    const initialize = async () => {
      console.log('🚀 TrueGrit: Starting authentication...')
      
      try {
        // Check if Supabase is properly configured
        if (!supabase || !isSupabaseConfigured()) {
          console.warn('⚠️ Supabase not configured - using demo mode')
          
          if (mounted) {
            // Create demo admin user for testing
            const demoUser = {
              id: 'demo-admin-user',
              email: 'admin@demo.com',
              user_metadata: { full_name: 'Demo Admin' }
            } as User

            const demoProfile = {
              id: 'demo-admin-user',
              email: 'admin@demo.com',
              full_name: 'Demo Admin',
              role: 'admin',
              phone: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }

            setUser(demoUser)
            setProfile(demoProfile)
            setError(null)
            setLoading(false)
            setInitialized(true)
          }
          return
        }

        // Get current session with proper error handling
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('❌ Session error:', sessionError.message)
          throw sessionError
        }

        if (mounted) {
          setSession(session)
          setUser(session?.user || null)
          
          // Load profile if user exists
          if (session?.user) {
            console.log('👤 User found, loading profile...')
            try {
              await loadProfile(session.user.id)
            } catch (profileError) {
              console.error('Profile loading failed, continuing anyway:', profileError)
              // Don't block initialization if profile loading fails
            }
          } else {
            console.log('👤 No session found - user needs to sign in')
          }
          
          setError(null)
          setLoading(false)
          setInitialized(true)
          console.log('✅ Authentication initialized')
        }

      } catch (error: any) {
        console.error('❌ Authentication initialization failed:', error?.message || error)
        
        if (mounted) {
          // Clear everything and allow user to sign in
          setUser(null)
          setProfile(null)
          setError(null)
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    // Setup auth state listener with proper error handling
    const setupAuthListener = () => {
      try {
        if (supabase && isSupabaseConfigured()) {
          const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              console.log('🔄 Auth event:', event)
              
              if (mounted) {
                setSession(session)
                setUser(session?.user || null)
                
                if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
                  await loadProfile(session.user.id)
                } else if (event === 'SIGNED_OUT') {
                  setProfile(null)
                }
              }
            }
          )
          
          authSubscription = data.subscription
        }
      } catch (error) {
        console.error('❌ Auth listener setup failed:', error)
      }
    }

    // Start initialization and setup listener
    initialize()
    setupAuthListener()

    // Cleanup function with proper error handling
    return () => {
      mounted = false
      
      if (authSubscription) {
        try {
          authSubscription.unsubscribe()
        } catch (error) {
          console.warn('⚠️ Subscription cleanup warning:', error)
        }
      }
    }
  }, []) // Run once on mount

  // Load user profile with improved error handling
  const loadProfile = async (userId: string) => {
    console.log('📝 Loading profile for:', userId)
    
    try {
      if (!supabase || !isSupabaseConfigured()) {
        console.log('📝 Supabase not configured, using fallback profile')
        const fallbackProfile = createFallbackProfile(userId)
        fallbackProfile.is_admin = true // Make fallback admin for testing
        setProfile(fallbackProfile)
        return
      }

      // First try admin_profiles, then profiles
      let profileData = null
      let isAdmin = false

      // Try admin_profiles first
      const { data: adminData } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (adminData) {
        profileData = adminData
        isAdmin = adminData.is_admin === true
        console.log('✅ Admin profile loaded:', adminData.full_name)
      } else {
        // Fall back to profiles table
        const { data: regularProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle()
        
        if (regularProfile) {
          profileData = regularProfile
          isAdmin = regularProfile.role === 'admin' || regularProfile.role === 'manager'
          console.log('✅ Regular profile loaded:', regularProfile.full_name)
        }
      }

      if (profileData) {
        const enhancedProfile = {
          ...profileData,
          is_admin: isAdmin
        }
        setProfile(enhancedProfile)
      } else {
        console.log('📝 No profile found, creating new profile...')
        await createUserProfile(userId, false)
      }
      
    } catch (error) {
      console.error('❌ Profile loading failed:', error)
      // Always provide a fallback to prevent blocking
      const fallbackProfile = createFallbackProfile(userId)
      fallbackProfile.is_admin = true // Give fallback admin for testing
      setProfile(fallbackProfile)
    }
  }

  // Create fallback profile from user data
  const createFallbackProfile = (userId: string) => {
    const userData = user || null
    
    return {
      id: userId,
      email: userData?.email || 'unknown@demo.com',
      full_name: userData?.user_metadata?.full_name || 
                userData?.email?.split('@')[0] || 
                'Demo User',
      role: 'crew_member',
      phone: userData?.user_metadata?.phone || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }

  // Create new user profile in database
  const createUserProfile = async (userId: string, isAdmin = false) => {
    try {
      const newProfile = createFallbackProfile(userId)
      newProfile.is_admin = isAdmin

      const { data: createdProfile, error: createError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .maybeSingle()

      if (createError) {
        console.error('❌ Profile creation failed:', createError)
        setProfile(newProfile) // Use fallback
      } else if (createdProfile) {
        console.log('✅ Profile created:', createdProfile.full_name)
        setProfile(createdProfile)
      } else {
        newProfile.is_admin = isAdmin
        setProfile(newProfile) // Use fallback
      }
    } catch (error) {
      console.error('❌ Profile creation error:', error)
      setProfile(createFallbackProfile(userId))
    }
  }

  // Sign in with enhanced error handling
  const signIn = async (email: string, password: string) => {
    if (!supabase || !isSupabaseConfigured()) {
      // Handle demo credentials only if Supabase is not configured
      if (email === 'admin@demo.com' && password === 'demo123') {
        console.log('🎯 Demo admin login detected (no Supabase)')
        
        const demoUser = {
          id: 'demo-admin-user',
          email: 'admin@demo.com',
          user_metadata: { full_name: 'Demo Admin' }
        } as User

        const demoProfile = {
          id: 'demo-admin-user',
          email: 'admin@demo.com',
          full_name: 'Demo Admin',
          role: 'admin',
          phone: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        setUser(demoUser)
        setProfile(demoProfile)
        setError(null)
        setLoading(false)
        
        return { data: { user: demoUser }, error: null }
      }
      
      setError('Database not connected. Please connect to Supabase.')
      return { data: null, error: new Error('Database not connected') }
    }

    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        setError(error.message)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error: any) {
      setError(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign up with enhanced error handling
  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase || !isSupabaseConfigured()) {
      setError('Database not connected. Please connect to Supabase.')
      return { data: null, error: new Error('Database not connected') }
    }

    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      
      if (error) {
        setError(error.message)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error: any) {
      setError(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out with proper cleanup
  const signOut = async () => {
    try {
      if (supabase && isSupabaseConfigured()) {
        await supabase.auth.signOut()
      }
      
      // Always clear state regardless of Supabase connection
      setUser(null)
      setSession(null)
      setProfile(null)
      setError(null)
    } catch (error: any) {
      console.error('❌ Sign out error:', error)
    }
  }

  // Update user role with proper error handling
  const updateUserRole = async (userId: string, newRole: string) => {
    // Check if current user is admin (either from profile or app_metadata)
    const isCurrentUserAdmin = profile?.role === 'admin' || 
                               profile?.role === 'manager' ||
                               (user as any)?.app_metadata?.role === 'admin'
    
    if (!isCurrentUserAdmin) {
      return { success: false, error: 'Insufficient permissions to change user roles' }
    }

    // Handle demo user role updates
    if (!supabase || !isSupabaseConfigured()) {
      // For demo mode, update the profile directly in state
      if (userId === user?.id) {
        setProfile(prev => prev ? { ...prev, role: newRole } : prev)
        return { success: true }
      }
      return { success: true } // Allow demo updates for testing
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) {
        return { success: false, error: error.message }
      }

      // Refresh profile if updating current user
      if (userId === user?.id) {
        await loadProfile(userId)
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook with proper error handling for usage outside provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider. Make sure to wrap your component with <AuthProvider>')
  }
  return context
}