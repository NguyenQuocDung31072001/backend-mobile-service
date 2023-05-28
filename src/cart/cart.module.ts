import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartSchema } from './cart.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Cart',
        schema: CartSchema,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
