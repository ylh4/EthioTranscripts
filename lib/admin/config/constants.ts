export const AUTH_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard'
} as const

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  USER_NOT_FOUND: 'User not found',
  UNKNOWN: 'An unexpected error occurred'
} as const