export class UserClaimsModel {
    accessToken: string = '';
    refreshToken: string = '';
}

export interface JwtPayload {
    exp: number,
    iss: string
}