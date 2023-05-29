import { Schema, Document } from 'mongoose';
import { Rating } from 'src/rating/model/rating.model';

const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image_url: String,
    public_id: String,
    date: String,
    quantity: Number,
    rating: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
    collection: 'product',
  },
);

export { ProductSchema };

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  image_url: string;
  public_id: string;
  date: string;
  quantity: number;
  rating: (Rating | string)[];
}
