export interface ILoginModel {
    username: string;
    password: string;
    useRefreshTokens: boolean;
}

export interface ILoginResponseModel {
    token: string;
    userName: string;
    refreshToken: string;
    useRefreshTokens: boolean;
    loginDateTime: Date;
    lastRequestDateTime: Date;
}
