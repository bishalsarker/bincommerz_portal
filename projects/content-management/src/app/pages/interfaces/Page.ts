export interface Page {
    id?: string;
    pageTitle: string;
    slug: string;
    category: string;
    linkTitle: string;
    content: string;
    isPublished: boolean;
}