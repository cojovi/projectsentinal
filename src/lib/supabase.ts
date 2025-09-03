import { createClient } from '@supabase/supabase-js'

// Environment variable guards for different React frameworks
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

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

// Debug environment variables safely
console.log('🔍 Supabase Environment Check:')
console.log('- VITE_SUPABASE_URL exists:', !!supabaseUrl)
console.log('- VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey)
console.log('- URL configured:', supabaseUrl && !supabaseUrl.includes('placeholder') && !supabaseUrl.includes('your_supabase_url_here'))

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file')
}

// Create Supabase client with proper error handling
let supabaseClient: any = null

try {
  if (supabaseUrl && 
      supabaseAnonKey && 
      !supabaseUrl.includes('your_supabase_url_here') && 
      !supabaseAnonKey.includes('your_supabase_anon_key_here') &&
      !supabaseUrl.includes('placeholder') &&
      !supabaseAnonKey.includes('placeholder')) {
    
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        storageKey: 'truegrit-auth',
      },
    })
    
    console.log('✅ Supabase client created successfully')
  } else {
    console.warn('⚠️ Supabase environment variables not properly configured')
  }
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error)
  supabaseClient = null
}

export const supabase = supabaseClient


export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'crew_lead' | 'crew_member'
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'admin' | 'manager' | 'crew_lead' | 'crew_member'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'manager' | 'crew_lead' | 'crew_member'
          phone?: string | null
          updated_at?: string
        }
      }
      communities: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          builder_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          builder_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          builder_name?: string
          updated_at?: string
        }
      }
      floorplans: {
        Row: {
          id: string
          name: string
          community_id: string
          sqft: number
          bedrooms: number
          bathrooms: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          community_id: string
          sqft: number
          bedrooms: number
          bathrooms: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          community_id?: string
          sqft?: number
          bedrooms?: number
          bathrooms?: number
          image_url?: string | null
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          job_number: string
          community_id: string
          floorplan_id: string | null
          lot_address: string
          work_order_type: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          estimated_start_date: string
          estimated_end_date: string
          actual_start_date: string | null
          actual_end_date: string | null
          crew_lead_id: string | null
          estimated_cost: number
          actual_cost: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_number: string
          community_id: string
          floorplan_id?: string | null
          lot_address: string
          work_order_type: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          estimated_start_date: string
          estimated_end_date: string
          actual_start_date?: string | null
          actual_end_date?: string | null
          crew_lead_id?: string | null
          estimated_cost: number
          actual_cost?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_number?: string
          community_id?: string
          floorplan_id?: string | null
          lot_address?: string
          work_order_type?: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          estimated_start_date?: string
          estimated_end_date?: string
          actual_start_date?: string | null
          actual_end_date?: string | null
          crew_lead_id?: string | null
          estimated_cost?: number
          actual_cost?: number
          notes?: string | null
          updated_at?: string
        }
      }
      estimates: {
        Row: {
          id: string
          job_id: string
          estimate_number: string
          line_items: any[]
          total_labor_cost: number
          total_material_cost: number
          profit_margin: number
          final_price: number
          status: 'draft' | 'sent' | 'approved' | 'rejected'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          estimate_number: string
          line_items: any[]
          total_labor_cost: number
          total_material_cost: number
          profit_margin: number
          final_price: number
          status?: 'draft' | 'sent' | 'approved' | 'rejected'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          estimate_number?: string
          line_items?: any[]
          total_labor_cost?: number
          total_material_cost?: number
          profit_margin?: number
          final_price?: number
          status?: 'draft' | 'sent' | 'approved' | 'rejected'
          created_by?: string
          updated_at?: string
        }
      }
      crew_assignments: {
        Row: {
          id: string
          job_id: string
          crew_member_id: string
          assigned_date: string
          role: string
          hours_worked: number
          hourly_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          crew_member_id: string
          assigned_date: string
          role: string
          hours_worked?: number
          hourly_rate: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          crew_member_id?: string
          assigned_date?: string
          role?: string
          hours_worked?: number
          hourly_rate?: number
          updated_at?: string
        }
      }
      materials: {
        Row: {
          id: string
          name: string
          category: string
          unit: string
          cost_per_unit: number
          current_stock: number
          minimum_stock: number
          supplier: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          unit: string
          cost_per_unit: number
          current_stock?: number
          minimum_stock?: number
          supplier?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          unit?: string
          cost_per_unit?: number
          current_stock?: number
          minimum_stock?: number
          supplier?: string | null
          updated_at?: string
        }
      }
      job_photos: {
        Row: {
          id: string
          job_id: string
          photo_url: string
          caption: string | null
          taken_by: string
          taken_at: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          photo_url: string
          caption?: string | null
          taken_by: string
          taken_at: string
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          photo_url?: string
          caption?: string | null
          taken_by?: string
          taken_at?: string
        }
      }
    }
  }
}