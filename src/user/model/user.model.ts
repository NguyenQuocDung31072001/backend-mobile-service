import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    fullname: String,
    address: String,
    password: String,
    phone_number: String,
    avatar_url: String,
    public_id: String,
  },
  {
    timestamps: true,
    collection: 'user',
  },
);

export { UserSchema };

export interface User extends Document {
  username: string;
  email: string;
  fullname: string;
  address: string;
  password: string;
  phone_number: string;
  avatar_url: string;
  public_id: string;
}
