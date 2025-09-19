export {}

// Create a type for the roles
export type Roles = 'doctor' | 'clinic' | 'admin' | 'patient'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}