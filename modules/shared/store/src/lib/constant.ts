import { AppState } from "./model";

export const APP_STATE_BLANK: AppState = {
    user: {
        isLogin: false,
        avatarUrl: 'https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg',
        username: 'tmp79',
        fullName: "PeGiphy Admin",
        email: 'tmp79@gmail.com'
    },
    themeMode: 'dark',
    language: 'en',
    defaultAsset: {
        avatarUrl: 'https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg',
        backgroundUrl: 'https://wallpapercave.com/wp/wp5126188.jpg'
    }
}