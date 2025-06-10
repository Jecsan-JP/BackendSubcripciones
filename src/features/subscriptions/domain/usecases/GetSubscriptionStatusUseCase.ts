import { UseCase } from "../../../../common/interfaces/UseCase";
import { UserRepository } from "../repositories/UserRepository";
import { StripeService } from "../../../../common/services/StripeService";
import { NotFoundError } from "../../../../common/errors/errors";

interface GetSubscriptionStatusInput {
  customerId: string;
}

interface GetSubscriptionStatusOutput {
  name: string;
  email: string;
  status: string;
  currentPeriodEnd?: number;
}

export class GetSubscriptionStatusUseCase
  implements UseCase<GetSubscriptionStatusInput, GetSubscriptionStatusOutput>
{
  constructor(
    private userRepository: UserRepository,
    private stripeService: StripeService
  ) {}

  async execute(
    input: GetSubscriptionStatusInput
  ): Promise<GetSubscriptionStatusOutput> {
    // 1. Buscar usuario en la BD
    const user = await this.userRepository.findByCustomerId(input.customerId);
    if (!user) {
      throw new NotFoundError("Usuario");
    }

    // 2. Consultar la suscripción en Stripe
    const subscription = await this.stripeService.getSubscriptionStatus(
      input.customerId
    );
    if (!subscription) {
      return {
        name: user.name,
        email: user.email,
        status: "no_subscription",
      };
    }

    return {
      name: user.name,
      email: user.email,
      status: subscription.status,
      currentPeriodEnd: subscription.items.data[0].current_period_end,
    } as GetSubscriptionStatusOutput;
  }
}
