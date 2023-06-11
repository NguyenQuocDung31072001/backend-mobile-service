import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from '../model/rating.model';
import { RatingRepository } from '../repositories/rating.repository';
import { User } from 'src/user/model/user.model';
import { Product } from 'src/product/model/product.model';
import { Purchase } from 'src/purchase/purchase.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel('Rating')
    private readonly ratingModel: Model<Rating>,
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Purchase')
    private readonly purchaseModel: Model<Purchase>,

    private readonly ratingRepository: RatingRepository,
  ) {}

  async getRatingByProduct(id_product) {
    return this.productModel.findById(id_product).populate({
      path: 'rating',
      populate: {
        path: 'user',
      },
    });
  }

  async createRating(
    id_user: string,
    id_product: string,
    rating: number,
    comment: string,
  ) {
    const fieldPurchase: any = { user: id_user };
    const purchases = await this.purchaseModel.find(fieldPurchase);
    if (!purchases) {
      throw new HttpException('user dont have purchase', HttpStatus.NOT_FOUND);
    }
    const productWasPurchase = purchases.some(
      (purchase) =>
        purchase.product.includes(id_product) && purchase.status === 'success',
    );
    if (!productWasPurchase) {
      throw new HttpException(
        'user dont have purchase success',
        HttpStatus.NOT_FOUND,
      );
    }

    const newRating = await this.ratingModel.create({
      user: id_user,
      rating: rating,
      comment: comment,
    });
    const product = await this.productModel.findById(id_product);

    product.rating = [...product.rating, newRating._id];
    await product.save();
    return 'rating successfull';
  }

  async updateRating(id: string, new_rating: number) {
    const rating = await this.ratingModel.findById(id);
    if (!rating) {
      throw new HttpException('Rating not found', HttpStatus.NOT_FOUND);
    }
    rating.rating = new_rating;
    return rating.save();
  }

  async deleteRating(id: string, id_product: string) {
    const product = await this.productModel.findById(id_product);
    product.rating = product.rating.filter((_rating) => _rating !== id);
    await product.save();
    return await this.ratingModel.deleteOne({ _id: id });
  }
}
