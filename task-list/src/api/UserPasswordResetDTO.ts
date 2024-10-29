export interface UserPasswordResetDTO {
  user: {
    token: string
    password: string
    password_confirmation: string
  }
}
