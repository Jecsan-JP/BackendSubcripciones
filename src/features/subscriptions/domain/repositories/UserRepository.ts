import { UserModel } from "../../db_source/user.model";
import { User } from "../models/User";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCustomerId(customerId: string): Promise<User | null>;
  updateSubscriptionId(
    customerId: string,
    subscriptionId: string
  ): Promise<void>;
}

export class UserDataRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return created.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).lean();
  }

  async findByCustomerId(customerId: string): Promise<User | null> {
    return UserModel.findOne({ customerId }).lean();
  }

  async updateSubscriptionId(
    customerId: string,
    subscriptionId: string
  ): Promise<void> {
    await UserModel.updateOne({ customerId }, { subscriptionId });
  }
}
