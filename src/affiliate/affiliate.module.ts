import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';

@Module({
  controllers: [AffiliateController],
  providers: [AffiliateService],
})
export class AffiliateModule {}
