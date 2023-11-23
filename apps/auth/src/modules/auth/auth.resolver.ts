import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/auth.dto';
import { Public } from '@app/common/modules/auth/decorators';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  public async register(
    @Args('CreateAuthInput') CreateAuthInput: CreateAuthInput,
    @Context() context: any,
  ) {
    const tokens = await this.authService.register(CreateAuthInput);
    context.res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    context.res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }

  @Public()
  @Mutation(() => Auth)
  public async login(
    @Args('CreateAuthInput') CreateAuthInput: CreateAuthInput,
    @Context() context: any,
  ) {
    const tokens = await this.authService.login(CreateAuthInput);
    context.res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    context.res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }
}
