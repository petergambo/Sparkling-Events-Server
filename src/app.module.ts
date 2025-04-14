/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';
import { AuthModule } from './middlewares/auth.module';
import { AirtimeModule } from './airtime/airtime.module';
import { DataModule } from './data/data.module';
import { GiftCardsModule } from './gift-cards/gift-cards.module';
import { BillsPayModule } from './bills-pay/bills-pay.module';
import { CryptoExchangeModule } from './crypto-exchange/crypto-exchange.module';
import { WaitListModule } from './wait-list/wait-list.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { EmailModule } from './email/email.module';
import { AirtimeReloadlyModule } from './airtime-reloadly/airtime-reloadly.module';
import { DataReloadlyModule } from './data-reloadly/data-reloadly.module';
import { BillsPayReloadlyModule } from './bills-pay-reloadly/bills-pay-reloadly.module';

@Module({
  imports: [UsersModule, TransactionsModule, WalletModule, DatabaseModule, AuthModule, AirtimeModule, DataModule, GiftCardsModule, BillsPayModule, CryptoExchangeModule, WaitListModule, AdminSettingsModule, UserSettingsModule, EmailModule, AirtimeReloadlyModule, DataReloadlyModule, BillsPayReloadlyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).exclude(
      { path: 'users/register', method:  RequestMethod.POST },
      { path: 'users/login', method:  RequestMethod.POST },
      { path: 'users/verify-otp', method:  RequestMethod.POST },
      { path: 'wait-list', method:  RequestMethod.POST },
    ).forRoutes('*'); // Apply to all routes
  }
}
