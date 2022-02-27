import { Process } from "../../processes/interfaces/process";


export interface Order {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  totalPayable: number;
  totalDue: number;
  shippingCharge: number;
  paymentMethod: string;
  paymentNotes?: string;
  placedOn: Date;
  currentProcess?: Process;
  isCanceled: boolean;
  isCompleted: boolean;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  name: string;
  price: number;
  discount: number;
  discountAmount: number;
  quantity: number;
  subtotal: number;
}

export interface OrderPayment {
  orderId?: string;
  transactionType?: string;
  transactionMethod: string;
  amount: number;
  paymentNotes: string;
  logDateTime?: Date;
}
