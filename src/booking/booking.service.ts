/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { generateVTPassRequestId, sendEmail } from 'src/utils/functions';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly databaseService: DatabaseService){}
  
  async create(createPackageDto: CreateBookingDto) {
   
    try {
      const newCustomer = await this.databaseService.customer.create({
        data: {
          first_name: createPackageDto.customer.first_name,
          last_name: createPackageDto.customer.last_name,
          email: createPackageDto.customer.email,
          phone: createPackageDto.customer.phone,
        },
      });
      
      const booking = await this.databaseService.booking.create({
        data: {
          reference: generateVTPassRequestId(),
          email: createPackageDto.email,
          colorChoices: createPackageDto.colorChoices,
          paymentPlan: createPackageDto.paymentPlan,
          eventType: createPackageDto.eventType,
          guestSize: createPackageDto.guestSize,
          amount: createPackageDto.amount,
          date: new Date(createPackageDto.date),
          venue: createPackageDto.venue,
          additionalInformation: createPackageDto.additionalInformation,
          package: {
            connect: { id: createPackageDto.packageId }
          },          
          customer: {
            connect: { id: newCustomer.id }
          }
        },
        include: {customer: true, package: true}
      });
      
       // Fix next payment schedule
    if(Number(createPackageDto.paymentPlan))
  
    {
      const paymentPlan = Number(createPackageDto.paymentPlan)

      if(paymentPlan !== 100)
      {
      const nextPaymentDate = new Date(Date.now());
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      createPackageDto.nextPaymentDate = nextPaymentDate.toISOString();
      }

      await this.databaseService.schedulePayments.create({
        data: {
          bookingId: booking.id,
          paymentDate: createPackageDto.nextPaymentDate,
          amount: booking.package.price - createPackageDto.amount,
          initialAmountPayed: (Number(booking.package.price) * (paymentPlan / 100)),
        }
      })
    }

      if(booking)
      {
        // Mail Admin
        await sendEmail(process.env.BOOKING_REQUEST_EMAIL,
          `<div>
          Hello ${booking.customer.first_name} ${booking.customer.last_name}
          Your Booking with Sparkling Event on hold has been made successfully. Please pay to finalize your reservation.
          <table>
            <tr>
              <td>Date</td>
              <td>${booking.date}</td>
            </tr>
             <tr>
              <td>Event Type</td>
              <td>${booking.eventType}</td>
            </tr>
            <tr>
              <td>Guest Size</td>
              <td>${booking.guestSize}</td>
            </tr>
            <tr>
              <td>Payment Plan</td>
              <td>${booking.paymentPlan}% Upfront</td>
            </tr>

             <tr>
              <td>Amount</td>
              <td>${booking.amount}</td>
            </tr>

             <tr>
              <td>Amount</td>
              <td>${booking.amount}</td>
            </tr>

            <tr>
              <td>Color Choices</td>
              <td>${booking.colorChoices}</td>
            </tr>
          </table>
          </div>`,
          'Booking Notification',
          'Notification'
        )

// Mail Customer
        await sendEmail(booking.customer.email,
          `<div>
          Hello ${booking.customer.first_name} ${booking.customer.last_name}
          Your Booking with Sparkling Event on hold has been made successfully. Please pay to finalize your reservation.
          <table>
            <tr>
              <td>Date</td>
              <td>${booking.date}</td>
            </tr>
             <tr>
              <td>Event Type</td>
              <td>${booking.eventType}</td>
            </tr>
            <tr>
              <td>Guest Size</td>
              <td>${booking.guestSize}</td>
            </tr>
            <tr>
              <td>Payment Plan</td>
              <td>${booking.paymentPlan}% Upfront</td>
            </tr>

             <tr>
              <td>Amount</td>
              <td>${booking.amount}</td>
            </tr>

             <tr>
              <td>Amount</td>
              <td>${booking.amount}</td>
            </tr>

            <tr>
              <td>Color Choices</td>
              <td>${booking.colorChoices}</td>
            </tr>
          </table>
          </div>`,
          'Booking Notification',
          'Notification'
        )

        return booking
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return this.databaseService.booking.findMany({
      include:{package: true, SchedulePayments: true},
      orderBy:{createdAt: 'desc'}
    });
  }

  findOne(id: string) {
    return this.databaseService.booking.findFirst({where:{id},
    include:{package: true, customer: true, SchedulePayments: true}});
  }

  update(id: string, updateBookingDto: Prisma.PackageUpdateInput) {
    return this.databaseService.booking.update({
      where:{id},
      data: updateBookingDto
    });
  }

  remove(id: string) {
    return this.databaseService.booking.delete({where: {id}})
  }
}
