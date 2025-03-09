/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import * as bcrypt from 'bcryptjs';





@Injectable()
export class AuthService {
    generateToken(payload: any): object {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is undefined. Make sure it's set in your .env file.");
        }

        // const options: jwt.SignOptions = {
        //     expiresIn: '1hr',
        // }
      
        return {"token": jwt.sign(payload, process.env.JWT_SECRET)}
      }

  async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const hashed_password : string = await bcrypt.hash(password, salt);
    
    return hashed_password;
  }
}
