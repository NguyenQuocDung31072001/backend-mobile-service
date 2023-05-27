import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Product } from '../model/product.model';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
  async findAllProductByCondition(field: any) {
    return this.productModel.find(field);
  }
}
