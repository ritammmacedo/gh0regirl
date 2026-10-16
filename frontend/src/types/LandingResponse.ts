export interface LandingResponse {
    Banner: {
        url: string,
        mime: string,
        alternativeText: string
    },
    Description: String,
    Media_Fullscreen:{
        url: string,
        mime: string,
        alternativeText: string
    },
    Name: string,
    data?: LandingResponse
}
