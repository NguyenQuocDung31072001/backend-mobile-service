import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Purchase } from './purchase.model';

@Injectable()
export class PurchaseRepository extends BaseRepository<Purchase> {
  constructor(
    @InjectModel('Purchase')
    private readonly purchaseModel: Model<Purchase>,
  ) {
    super(purchaseModel);
  }
}
