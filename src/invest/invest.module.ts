import { Module } from '@nestjs/common';
import { InvestService } from './invest.service';
import { InvestController } from './invest.controller';

@Module({
  controllers: [InvestController],
  providers: [InvestService],
})
export class InvestModule {}
