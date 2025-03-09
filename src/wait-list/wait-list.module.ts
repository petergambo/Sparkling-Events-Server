import { Module } from '@nestjs/common';
import { WaitListService } from './wait-list.service';
import { WaitListController } from './wait-list.controller';

@Module({
  controllers: [WaitListController],
  providers: [WaitListService],
})
export class WaitListModule {}
