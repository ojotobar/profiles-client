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

export interface LoginResultModel {
    message: string,
    accessToken: string,
    successful: boolean,
    emailNotConfirmed: boolean
}

export interface SystemRoleResponseModel {
    id: string,
    name: string,
    users: number
}