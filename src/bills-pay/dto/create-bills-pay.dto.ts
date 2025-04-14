/* eslint-disable prettier/prettier */
export class CreateBillsPayDto {
    variation_code: string;
    subscription_type: string;
    billersCode: string;
    amount: string;
    phone: string;
    email: string; 
    pin: string;
}

export class MerchantVerifyDTO {
    serviceID: string;
    billersCode: string;
}

