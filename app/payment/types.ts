export interface PaymentItem {
    id: string;
    pid: string;
    name: string;
    price: number;
    amount: number;
    stock: number;
    image?: string;
    webpath?: string;
}

export interface Address {
    id: string;
    title: string;
    name: string;
    surname: string;
    phone: string;
    city: string;
    district: string;
    address: string;
    zipCode: string;
}

export interface PaymentData {
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface UserData {
    id: string;
    email: string;
    ip: string;
    last_login: string;
    date: string;
    address: Address;
}

export interface PaymentResponse {
    pay: {
        data: {
            status: string;
            paymentId: string;
            conversationId: string;
            price: number;
            cardType: string;
            cardFamily: string;
            cardAssociation: string;
            basketItems: PaymentItem[];
        }
    }
}

export interface CustomerInfo {
    id: string;
    email: string;
    phone: string;
    address: string;
    contactName: string;
}

export interface PaymentInfo {
    paymentId: string;
    conversationId: string;
    cardType: string;
    cardFamily: string;
    cardAssociation: string;
} 