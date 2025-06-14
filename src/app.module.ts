/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletModule } from './wallet/wallet.module';
import { GalleryModule } from './gallery/gallery.module';
import { PackageModule } from './package/package.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { CloudinaryUploadModule } from './cloudinary-upload/cloudinary-upload.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { InvestModule } from './invest/invest.module';


@Module({
  imports: [UsersModule, TransactionsModule, WalletModule, GalleryModule, PackageModule, BookingModule, ReviewModule, CloudinaryUploadModule, AffiliateModule, InvestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).exclude(
      { path: '/', method:  RequestMethod.POST },
      { path: '/', method:  RequestMethod.GET },
      { path: 'users/register', method:  RequestMethod.POST },
      { path: 'users/login', method:  RequestMethod.POST },
      { path: 'users/verify-otp', method:  RequestMethod.POST },
      { path: 'pay/init', method:  RequestMethod.POST },
      { path: 'pay/finalize', method:  RequestMethod.POST },
      { path: 'booking', method:  RequestMethod.POST },
      { path: 'review', method:  RequestMethod.POST },
      { path: 'review', method:  RequestMethod.GET },
      { path: 'package', method:  RequestMethod.GET },
      { path: 'package/package-items/:packageName', method:  RequestMethod.GET },
      { path: 'package/get-by-subpackage-name/:packageName', method:  RequestMethod.GET },
      { path: 'gallery', method:  RequestMethod.GET },
      { path: 'affiliate', method:  RequestMethod.POST },
      { path: 'invest', method:  RequestMethod.POST },
      { path: 'email', method:  RequestMethod.POST },

    ).forRoutes('*'); // Apply to all routes
  }
}
