import { CreateCheckoutSessionUseCase } from "../domain/usecases/CreateCheckoutSessionInputUseCase";
import { UserDataRepository } from "../domain/repositories/UserRepository";
import { StripeService } from "../../../common/services/StripeService";
import { GetSubscriptionStatusUseCase } from "../domain/usecases/GetSubscriptionStatusUseCase";
import { UserMongoRepository } from "../db_source/user.mongo.repository";
import { GetUserByEmailUseCase } from "../domain/usecases/GetUserByEmailUseCase";

export function createCheckoutSessionUseCase() {
  return new CreateCheckoutSessionUseCase(
    new UserDataRepository(),
    new StripeService()
  );
}

export function getSubscriptionStatusUseCase() {
  return new GetSubscriptionStatusUseCase(
    new UserDataRepository(),
    new StripeService()
  );
}

export function getUserByEmailUseCase() {
  return new GetUserByEmailUseCase(new UserMongoRepository());
}
