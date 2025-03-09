/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { PurchaseAirtimeDto } from './dto/create-airtime.dto';
import { WalletService } from 'src/wallet/wallet.service';
import { airtimeSchema } from './dto/validator';

@Controller('airtime')
export class AirtimeController {
  constructor(private readonly airtimeService: AirtimeService,
    private readonly walletService: WalletService
  ) {}

  @Post("buy")
  async purchase(@Body() buyAirtimeDto: PurchaseAirtimeDto) {

    // Validate Data
    const { error } = airtimeSchema.validate(buyAirtimeDto);
    if (error) {
      return {message: error}
    }

    // Check amount vs Wallet Balance
    const wallet = await this.walletService.findOneByEmail(buyAirtimeDto.email)
    
    if(!wallet)
    {return {message: "Invalid Identity"}}

    if(wallet && parseInt(buyAirtimeDto.amount) > wallet.amount)
    {return {message: "Insufficient Balance. Please top up your wallet and try again"}}

    if(wallet.pin.pin == buyAirtimeDto.pin.toString())
    {
      // All conditions met. Proceed to buy airtime
      const apiStatus = await this.airtimeService.purchase(buyAirtimeDto)
      if(apiStatus)
      return this.airtimeService.purchase(buyAirtimeDto);
    }

    return {message: "Invalid Authorization"}
  }


}
