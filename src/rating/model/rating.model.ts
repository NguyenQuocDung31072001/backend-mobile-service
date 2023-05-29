import { Schema, Document } from 'mongoose';
import { User } from 'src/user/model/user.model';

const RatingSchema = new Schema(
  {
    rating: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: 'rating',
  },
);

export { RatingSchema };

export interface Rating extends Document {
  _id: string;
  rating: number;
  user: User;
}
