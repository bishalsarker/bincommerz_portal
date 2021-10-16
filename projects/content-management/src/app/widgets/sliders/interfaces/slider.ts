export interface Slider {
    id?: string;
    name: string;
    type: string;
}

export interface Slide {
    id?: string;
    imageURL?: string;
    image?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    sliderId?: string;
}