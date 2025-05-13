/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { sendEmail } from 'src/utils/functions';
import { Prisma } from '@prisma/client';

@Injectable()
export class AffiliateService {
  
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createAffiliateDto: Prisma.AffiliateCreateInput) {

    const affiliate = await this.databaseService.affiliate.create({ data: createAffiliateDto })

    // Mail Admin
    await sendEmail(process.env.AFFILIATE_REQUEST_EMAIL,
      `<div>
          Hello Admin,
          You have a new affiliate request from ${affiliate.fullname}. Find details below.
          <table>
          <tr>
              <td>ID</td>
              <td>${affiliate.id}</td>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${affiliate.fullname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${affiliate.email}</td>
            </tr>
             <tr>
              <td>Phone</td>
              <td>${affiliate.phone_number}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>${affiliate.createdAt}</td>
            </tr>
          </table>
          </div>`,
      'Affiliate Notification',
      'Notification'
    )

    // Mail User

    // Mail Customer
    await sendEmail(affiliate.email,
      `<div>
  Hello ${affiliate.fullname},<br/>
  Your request to become a Sparkling Event and Planners Ltd. affiliate is ${affiliate.status}. Find details of your application below.
  <table>
  <tr>
      <td>ID</td>
      <td>${affiliate.id}</td>
    </tr>
    <tr>
      <td>Full Name</td>
      <td>${affiliate.fullname}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${affiliate.email}</td>
    </tr>
     <tr>
      <td>Phone</td>
      <td>${affiliate.phone_number}</td>
    </tr>
    <tr>
      <td>Date Submitted</td>
      <td>${affiliate.createdAt}</td>
    </tr>
  </table>
  <br/>
  You will be contacted by Sparkling Event Planners staff for further information.
  <br/><br/>
  Thank you for your interest in us.<br/>
  Sparkling Event Team.<br/>
  FCT, Abuja.
  </div>`,
      'Affiliate Notification',
      'Notification'
    )

    return affiliate

  }

  findAll() {
    return `This action returns all affiliate`;
  }

  findOne(id: string) {
    return `This action returns a #${id} affiliate`;
  }

  async update(id: string, updateAffiliateDto: Prisma.AffiliateUpdateInput) {
    const update = await this.databaseService.affiliate.update({where: {id}, data:updateAffiliateDto})
    return update
  }

  remove(id: string) {
    return `This action removes a #${id} affiliate`;
  }
}
