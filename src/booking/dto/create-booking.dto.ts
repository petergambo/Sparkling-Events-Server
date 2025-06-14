/* eslint-disable prettier/prettier */
export class CreateBookingDto {
  reference: string;
    email: string;
    eventType: string;
    colorChoices : string;
    paymentPlan: string;
    nextPaymentDate?: string;
    guestSize: string;
    amount: number;
    date: Date;
    venue: string;
    additionalInformation: string;
    packageId: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    }
  }
  