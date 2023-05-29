import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from './model/rating.model';
import { RatingRepository } from './repositories/rating.repository';
import { RatingService } from './service/rating.service';
import { RatingController } from './controller/rating.controller';
import { ProductSchema } from 'src/product/model/product.model';
import { PurchaseSchema } from 'src/purchase/purchase.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'Rating',
        schema: RatingSchema,
      },
      {
        name: 'Purchase',
        schema: PurchaseSchema,
      },
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingRepository, RatingService],
})
export class RatingModule {}
