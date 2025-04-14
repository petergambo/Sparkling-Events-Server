/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/middlewares/auth.service';

import * as bcrypt from 'bcryptjs';
import { generateAccountNumber, generateOtp, sendEmail, sendOtpEmail } from 'src/utils/functions';



@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
  ) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    // Check for duplicate email
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashed_password = await this.authService.hashPassword(createUserDto.password);

    // Generate OTP
    const otpCode = generateOtp(); // e.g., random 6-digit number

    // Update DTO
    const updatedUserDto: Prisma.UserCreateInput = {
      ...createUserDto,
      password: hashed_password,
      otp: otpCode, // assuming you have an `otp` field in your User model
      Wallet: {
        create: {
          walletNo: generateAccountNumber(),
          pin: {
            create: {
              pin: '0000',
              changePinToken: '',
            },
          },
        },
      },
    };

    const newUser = await this.databaseService.user.create({
      data: updatedUserDto,
    });

    // Send OTP email
    await sendOtpEmail(newUser.email, otpCode);

    return newUser;
  }


  async login(loginUserDTO: { email: string, password: string }) {
    const user = await this.databaseService.user.findUnique({ where: { email: loginUserDTO.email } })
    // console.log(user)
    if (user && user.isVerified == true) {

      const passVerified = await bcrypt.compare(loginUserDTO.password, user.password)

      if (passVerified) {

       try {
        await sendEmail(
          user.email,
          "<p>Your account was logged in from Abuja Nigeria. If you do not recognize this activity, contact support now.</p>",
          "Account Accessed", 
          "Login Notification"
        )
       } catch (error) {
        console.log(error)
       }

        return this.authService.generateToken(user.id)
      }

      throw new BadRequestException({ message: "Invalid Login credentials" });
    }

    else if (user && user.isVerified == false) {
      throw new BadRequestException({ message: "Email not verified! Please check your email and verify" });
    }

    else {
      throw new BadRequestException({ message: "Account not found" })
    }

  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
      include: { Wallet: true }
    })
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  async verifyOtp(verifyOtpDTO: {email: string, otp: string}){

    const res = await this.databaseService.user.update(
      {
        where:{
          email: verifyOtpDTO.email,
          otp: verifyOtpDTO.otp
        },
        data: {
          isVerified: true,
          otp: null
        }
      }
    )

    try {
      await sendEmail(
        verifyOtpDTO.email,
        `<p>Hello ${res.first_name}<br/>You have successfully verified your ICM account.</p>
        <p>You can proceed to Login and enjoy the services on our platform</p>
        <p>Welcome onboard</p>
        <p>ICM Lux Elite Team
        <br/>Jos, Plateau state.
        </p>
        `,
        "Account Verified Successfully", 
        "Account Verification"
      )
     } catch (error) {
      console.log(error)
     }

    return res
  }

  remove(id: string) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
