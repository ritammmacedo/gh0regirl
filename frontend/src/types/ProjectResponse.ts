export interface ProjectResponse {
    documentId: string,
    Title: string,
    Description: string,
    Credits: string,
    Image: [
        {
            url: string,
            alternativeText: string
        }
    ],
    data?:Array<ProjectResponse>
}
