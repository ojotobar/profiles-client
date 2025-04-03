export interface ChangePasswordModel {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

export interface ChangeForgottenPasswordModel{
    email: string,
    code: string,
    newPassword: string,
    confirmNewPassword: string
}