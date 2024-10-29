export interface JwtUser {
    sub: string;
    authorities: {
        key: number;
        authority: string;
    }[];
    iat: number;
    exp: number;
    userId: string;
}
