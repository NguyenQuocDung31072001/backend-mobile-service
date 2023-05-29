import { Schema, Document } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/model/user.model';

const PurchaseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    status: String,
  },
  {
    timestamps: true,
    collection: 'purchase',
  },
);

export { PurchaseSchema };

export interface Purchase extends Document {
  user: User;
  product: (Product | string)[];
  status: string;
}
