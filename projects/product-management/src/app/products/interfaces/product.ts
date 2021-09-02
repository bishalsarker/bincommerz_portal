export interface Product {
  id?: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  discount: number;
  inStock?: boolean;
  stockQuantity: number;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  originalTmage: string;
  thumbnailImage: string;
  isDefault: boolean;
}
