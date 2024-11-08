export type UserRole = 'admin' | 'manager' | 'employee';

export interface UserDetails {
  email: string;
  role: UserRole;
}