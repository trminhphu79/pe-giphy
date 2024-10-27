export type AppState = {
    user: {
        isLogin: boolean,
        avatarUrl: string,
        username: string,
        fullName: string,
        email: string,
    },
    language: string,
    themeMode: string,
    defaultAsset: {
        avatarUrl: string,
        backgroundUrl: string
    }
}

