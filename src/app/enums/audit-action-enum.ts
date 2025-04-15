export enum AuditActionEnum {
    LoggedIn = 'LOGGED_IN',
    VerifiedAccount = 'VERIFIED_ACCOUNT',
    RoleUpdate = 'ROLE_UPDATE',
    ProfileUpdate = 'PROFILE_UPDATE',
    StatusChange = 'STATUS_CHANGE',
    PasswordChange = 'PASSWORD_CHANGE',
    PasswordReset = 'PASSWORD_RESET',
    ForgottenPasswordChange = 'FORGOTTEN_PASSWORD_CHANGE',
    Deprecated = 'DEPRECATED',
    Deleted = 'DELETED'
}