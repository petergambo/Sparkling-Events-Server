/* eslint-disable prettier/prettier */
export class PurchaseAirtimeDto {
    serviceID: string;
    amount: string; 
    phone: string; 
    email: string; 
    pin: number;
}

/* eslint-disable prettier/prettier */
export class AuthorizeTransactionDto {
    pin: number; 
}
