import { Schema, Document } from 'mongoose';
import { Rating } from 'src/rating/model/rating.model';

const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image_url: String,
    date: String,
    quantity: Number,
    rating: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  },
  {
    timestamps: true,
    collection: 'user',
  },
);

export { ProductSchema };

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  image_url: string;
  date: string;
  quantity: number;
  rating: [Rating];
}
