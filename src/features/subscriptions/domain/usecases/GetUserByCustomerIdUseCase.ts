import { UseCase } from "../../../../common/interfaces/UseCase";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../../../../common/errors/errors";

interface GetUserByCustomerIdInput {
  customerId: string;
}

interface GetUserByCustomerIdOutput {
  name: string;
  email: string;
  customerId: string;
}

export class GetUserByCustomerIdUseCase
  implements UseCase<GetUserByCustomerIdInput, GetUserByCustomerIdOutput>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserByCustomerIdInput): Promise<GetUserByCustomerIdOutput> {
    const user = await this.userRepository.findByCustomerId(input.customerId);
    if (!user) {
      throw new NotFoundError("Usuario");
    }
    return {
      name: user.name,
      email: user.email,
      customerId: user.customerId,
    };
  }
}