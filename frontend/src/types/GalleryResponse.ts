import type { GalleryItem } from "react-image-gallery";

export interface GalleryResponse {
    Medias: Array<GalleryItem>,
    Title: string,
    data?: GalleryResponse
}
