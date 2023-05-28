import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from './purchase.model';
import { PurchaseRepository } from './purchase.repository';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Purchase',
        schema: PurchaseSchema,
      },
    ]),
    CartModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseRepository],
})
export class PurchaseModule {}
