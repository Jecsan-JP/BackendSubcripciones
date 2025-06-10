import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  customerId: string;
  subscriptionId: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  customerId: { type: String, required: true, unique: true },
  subscriptionId: { type: String, required: true, unique: true },
});

export const UserModel = model<UserDocument>("UserSubscription", UserSchema);