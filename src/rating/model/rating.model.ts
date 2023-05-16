import { Schema, Document } from 'mongoose';
import { User } from 'src/user/model/user.model';

const RatingSchema = new Schema(
  {
    rating: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: 'user',
  },
);

export { RatingSchema };

export interface Rating extends Document {
  rating: number;
  user: User;
}
