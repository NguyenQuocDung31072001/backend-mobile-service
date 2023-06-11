import { Schema, Document } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/model/user.model';

const PurchaseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    product_info: Array,
    shipping_address: String,
    credit_card_number: String,
    expired_date: String,
    cvv: String,
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
  product_info: Product[];
  shipping_address: string;
  credit_card_number: string;
  expired_date: string;
  cvv: string;
  status: string;
}
