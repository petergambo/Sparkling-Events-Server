/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/middlewares/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[AuthModule, DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService,],
})
export class UsersModule {}
