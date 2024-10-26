export interface UserChangePasswordDTO {
  user: {
    current_password: string
    new_password: string
    password_confirmation: string
  }
}
