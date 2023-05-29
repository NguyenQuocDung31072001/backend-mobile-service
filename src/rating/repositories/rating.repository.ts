import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Rating } from '../model/rating.model';

@Injectable()
export class RatingRepository extends BaseRepository<Rating> {
  constructor(
    @InjectModel('Rating')
    private readonly ratingModel: Model<Rating>,
  ) {
    super(ratingModel);
  }
}
