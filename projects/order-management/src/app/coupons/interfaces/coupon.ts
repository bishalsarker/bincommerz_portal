export interface Coupon {
    id?: string;
    code: string;
    discount: number;
    discountType: string;
    minimumPurchaseAmount: number;
    isActive: boolean;
}