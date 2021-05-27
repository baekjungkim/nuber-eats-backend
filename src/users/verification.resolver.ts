import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { VerifyEmailInput, VerifyEmailOuput } from './dtos/verify-email.dto';
import { Verification } from './entities/verification.entity';
import { VerificationService } from './verification.service';

@Resolver(of => Verification)
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Mutation(returns => VerifyEmailOuput)
  verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOuput> {
    return this.verificationService.verifyEmail(code);
  }
}
