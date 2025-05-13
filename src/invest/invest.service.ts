/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { sendEmail } from 'src/utils/functions';

@Injectable()
export class InvestService {

  constructor(private readonly databaseService: DatabaseService) { }
  
  async create(createInvestDto: Prisma.InvestCreateInput) {
    const investor = await this.databaseService.invest.create({data: createInvestDto})

    // Mail Customer
    await sendEmail(process.env.AFFILIATE_REQUEST_EMAIL,
      `<div>
          Hello Admin,<br/>
          You have a new Investor request from ${investor.fullname}. Find details below.
          <table>
          <tr>
              <td>ID</td>
              <td>${investor.id}</td>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${investor.fullname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${investor.email}</td>
            </tr>
             <tr>
              <td>Phone</td>
              <td>${investor.phone_number}</td>
            </tr>
            <tr>
              <td>Date Submitted</td>
              <td>${investor.createdAt}</td>
            </tr>
          </table><br/>

          Thank you.
          </div>`,
      'Investor Notification',
      'Notification'
    )

    // Mail Customer
    await sendEmail(investor.email,
      `<div>
  Hello ${investor.fullname},<br/>
  Your request to become a Sparkling Event and Planners Ltd. Investor is ${investor.status}. Find your submitted details below.
  <table>
  <tr>
      <td>ID</td>
      <td>${investor.id}</td>
    </tr>
    <tr>
      <td>Full Name</td>
      <td>${investor.fullname}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${investor.email}</td>
    </tr>
     <tr>
      <td>Phone</td>
      <td>${investor.phone_number}</td>
    </tr>
    <tr>
      <td>Date Submitted</td>
      <td>${investor.createdAt}</td>
    </tr>
  </table>
  <br/>
  You will be contacted by Sparkling Event Planners staff for further information.
  <br/><br/>
  Thank you for your interest in us.<br/>
  Sparkling Event Team.<br/>
  FCT, Abuja.
  </div>`,
      'Investor Notification',
      'Notification'
    )
    return 'This action adds a new invest';
  }

  findAll() {
    return `This action returns all invest`;
  }

  findOne(id: string) {
    return `This action returns a #${id} invest`;
  }

  async update(id: string, updateInvestDto: Prisma.InvestUpdateInput) {

    const update = await this.databaseService.invest.update({where:{id}, data:updateInvestDto})

    return update;
  }

  remove(id: string) {
    return `This action removes a #${id} invest`;
  }
}
