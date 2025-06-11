import { UseCase } from "../../../../common/interfaces/UseCase";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../../../../common/errors/errors";

interface GetUserByEmailInput {
  email: string;
}

interface GetUserByEmailOutput {
  name: string;
  email: string;
  customerId: string;
}

export class GetUserByEmailUseCase
  implements UseCase<GetUserByEmailInput, GetUserByEmailOutput>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
    const user = await this.userRepository.findByEmail(input.email);
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
