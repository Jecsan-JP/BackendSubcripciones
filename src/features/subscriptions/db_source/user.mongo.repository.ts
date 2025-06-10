import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/models/User";
import { UserModel } from "./user.model";

export class UserMongoRepository implements UserRepository {
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

  async updateSubscriptionId(customerId: string, subscriptionId: string): Promise<void> {
    await UserModel.updateOne({ customerId }, { subscriptionId });
  }
} 