/* eslint-disable prettier/prettier */
export class CreateDataReloadlyDto {
    email: string;
    pin: string;
    operatorId: number;
    amount: number;
    useLocalAmount: boolean;
    customIdentifier: string;
    recipientEmail: string;
    recipientPhone: { countryCode: string; number: string };
    senderPhone: { countryCode: string; number: string };
  }
  