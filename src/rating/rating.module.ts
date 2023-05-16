import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from './model/rating.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Rating',
        schema: RatingSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class RatingModule {}
