import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Cart } from './cart.model';

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<Cart>,
  ) {
    super(cartModel);
  }
  async findByConditionAndPopulate(field: any) {
    return this.cartModel
      .find(field)
      .populate({ path: 'user' })
      .populate({ path: 'product' });
  }
  async findByConditionAndDontPopulate(field: any) {
    return this.cartModel.find(field);
  }
}
