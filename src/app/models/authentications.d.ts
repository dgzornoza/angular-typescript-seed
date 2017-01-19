export interface ILoginModel {
    Username: string;
    Password: string;
    UseRefreshTokens: boolean;
}

export interface ILoginResponseModel {
    Token: string;
    UserName: string;
    RefreshToken: string;
    UseRefreshTokens: boolean;
    LoginDateTime: Date;
    LastRequestDateTime: Date;
}
