import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    RatingModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: 'mobile-service',
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    CloudinaryModule,
    CategoryModule,
    CartModule,
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
