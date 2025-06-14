/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
// import { UpdateEmailDto } from './dto/update-email.dto';
import { sendEmail } from 'src/utils/functions';

@Injectable()
export class EmailService {
  async send(createEmailDto: CreateEmailDto) {
    await sendEmail(
      `sepconceptz@gmail.com`,
      createEmailDto.message,
      `New contact message.`,
      `Sparkling Events Contact Form`,
    );

    return await sendEmail(
      createEmailDto.email,
      `<div>Your message has been received. <br/> ${createEmailDto.message}</div>`,
      `Thank you for contacting us.`,
      `Sparkling Events Contact Form`,
    );
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  // update(id: number, updateEmailDto: UpdateEmailDto) {
  //   return `This action updates a #${id} email`;
  // }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
