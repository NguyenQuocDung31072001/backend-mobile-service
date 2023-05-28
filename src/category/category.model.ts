import { Schema, Document } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    collection: 'category',
  },
);

export { CategorySchema };

export interface Category extends Document {
  name: string;
}
