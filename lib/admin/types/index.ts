export interface LoginResult {
  success: boolean
  error?: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
  updated_at: string
}