import { Schema, Document } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/model/user.model';

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
  },
  {
    timestamps: true,
    collection: 'cart',
  },
);

export { CartSchema };

export interface Cart extends Document {
  user: User;
  product: Product;
  quantity: number;
}
