import { CreateCheckoutSessionUseCase } from "../domain/usecases/CreateCheckoutSessionInputUseCase";
import { UserDataRepository } from "../domain/repositories/UserRepository";
import { StripeService } from "../../../common/services/StripeService";

export function createCheckoutSessionUseCase() {
  return new CreateCheckoutSessionUseCase(
    new UserDataRepository(),
    new StripeService()
  );
}
