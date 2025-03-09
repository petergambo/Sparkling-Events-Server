/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/middlewares/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
