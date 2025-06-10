import { UseCase } from "../../../../common/interfaces/UseCase";
import { StripeService } from "../../../../common/services/StripeService";
import { UserRepository } from "../repositories/UserRepository";

interface CreateCheckoutSessionInput {
  name: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionOutput {
  url: string;
  customerId: string;
}

export class CreateCheckoutSessionUseCase
  implements UseCase<CreateCheckoutSessionInput, CreateCheckoutSessionOutput>
{
  constructor(
    private userRepository: UserRepository,
    private stripeService: StripeService
  ) {}

  async execute(
    input: CreateCheckoutSessionInput
  ): Promise<CreateCheckoutSessionOutput> {
    // 1. Buscar si el usuario ya existe
    let user = await this.userRepository.findByEmail(input.email);
    let customerId = user?.customerId;

    // 2. Si no existe, crear el Customer en Stripe y guardar en BD
    if (!user) {
      const customer = await this.stripeService.createCustomer(
        input.name,
        input.email
      );
      customerId = customer.id;
      user = await this.userRepository.createUser({
        name: input.name,
        email: input.email,
        customerId,
      });
    }

    // 3. Crear la sesión de Checkout
    const session = await this.stripeService.createCheckoutSession(
      customerId as string,
      input.priceId,
      input.successUrl,
      input.cancelUrl
    );

    return { url: session.url as string, customerId: customerId as string };
  }
}
