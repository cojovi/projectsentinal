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
  loadProfile: (userId?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simple, bulletproof initialization
  useEffect(() => {
    const initialize = () => {
      // Set a maximum timeout to prevent infinite loading
      const loadingTimeout = setTimeout(() => {
        console.log('⚠️ Loading timeout - forcing completion')
        setLoading(false)
      }, 3000)
      
      try {
        if (!supabase) {
          console.log('No Supabase - using demo mode')
          setUser(null)
          setProfile(null)
          setLoading(false)
          clearTimeout(loadingTimeout)
          return
        }

        // Get current session with timeout
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
          setUser(session?.user || null)
          setLoading(false)
          clearTimeout(loadingTimeout)
        }).catch((error) => {
          console.error('Session error:', error)
          setUser(null)
          setProfile(null)
          setLoading(false)
          clearTimeout(loadingTimeout)
        })
        
      } catch (error) {
        console.error('Auth initialization error:', error)
        setUser(null)
        setProfile(null)
        setLoading(false)
        clearTimeout(loadingTimeout)
      }
    }

    // Set up auth listener
    const authListener = supabase?.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user || null)
        
        if (session?.user && event === 'SIGNED_IN') {
          // Load profile AFTER sign in, not during initialization
          await loadProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setProfile(null)
        }
    })

    initialize()

    return () => {
      authListener?.data?.subscription?.unsubscribe()
    }
  }, []) // Empty dependency array - only run once

  // Load user profile - separate from initialization
  const loadProfile = async (userId?: string) => {
    const targetUserId = userId || user?.id
    if (!targetUserId || !supabase) return

    try {
      // Try admin_profiles first
      const { data: adminProfile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', targetUserId)
        .single()

      if (adminProfile) {
        setProfile(adminProfile)
        return
      }

      // Fallback to profiles table
      const { data: regularProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single()

      if (regularProfile) {
        setProfile({
          ...regularProfile,
          is_admin: regularProfile.role === 'admin' || regularProfile.role === 'manager'
        })
      }
    } catch (error) {
      console.error('Profile loading error:', error)
      // Create basic profile if none exists
      if (user) {
        setProfile({
          id: targetUserId,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          role: 'crew_member',
          phone: null,
          is_admin: false
        })
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { data: null, error: new Error('Database not connected') }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (data?.user && !error) {
        await loadProfile(data.user.id)
      }
      
      return { data, error }
    } catch (error: any) {
      return { data: null, error }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      return { data: null, error: new Error('Database not connected') }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })
      
      return { data, error }
    } catch (error: any) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
      setUser(null)
      setSession(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    const isAdmin = profile?.is_admin === true || profile?.role === 'admin' || profile?.role === 'manager'
    
    if (!isAdmin) {
      return { success: false, error: 'Insufficient permissions' }
    }

    if (!supabase) {
      return { success: false, error: 'Database not connected' }
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) {
        return { success: false, error: error.message }
      }

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
      updateUserRole,
      loadProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}