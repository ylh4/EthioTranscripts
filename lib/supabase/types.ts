export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          updated_at?: string
        }
      }
      university_locations: {
        Row: {
          id: string
          country: string
          city: string
          address: string
          created_at: string
        }
        Insert: {
          id?: string
          country: string
          city: string
          address: string
          created_at?: string
        }
        Update: {
          country?: string
          city?: string
          address?: string
        }
      }
      document_requests: {
        Row: {
          id: string
          created_at: string
          reference_number: string
          status: 'pending' | 'processing' | 'completed' | 'rejected'
          full_name: string
          email: string
          phone: string
          from_university: string
          to_university: string
          to_university_location_id: string
          document_type: string
          needs_translation: boolean
          needs_apostille: boolean
          additional_remarks?: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          reference_number: string
          status?: 'pending' | 'processing' | 'completed' | 'rejected'
          full_name: string
          email: string
          phone: string
          from_university: string
          to_university: string
          to_university_location_id: string
          document_type: string
          needs_translation?: boolean
          needs_apostille?: boolean
          additional_remarks?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'processing' | 'completed' | 'rejected'
          full_name?: string
          email?: string
          phone?: string
          from_university?: string
          to_university?: string
          to_university_location_id?: string
          document_type?: string
          needs_translation?: boolean
          needs_apostille?: boolean
          additional_remarks?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_status: {
        Args: { email_input: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]