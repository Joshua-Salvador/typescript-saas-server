export interface NewOrgData {
  name: string,
  email: string,
  createdAt: string
}

export interface AdminUser {
  email: string,
  password: string,
  confirmPassword: string,
  emailVerified: boolean
}

export interface AdminUserDoc {
  username: string,
  email: string,
  branch: string,
  position: string,
  organization?: string,
  userId?: string,
}
