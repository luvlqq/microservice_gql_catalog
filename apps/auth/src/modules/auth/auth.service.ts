import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthInput } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from './jwt.tokens.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokenService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public async register(dto: CreateAuthInput) {
    const user = await this.repository.foundUser(dto);
    if (user) {
      throw new BadRequestException('User with this email is already exist');
    }
    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.jwtTokenService.updateRtHash(newUser.id, tokens.refreshToken);
    this.logger.info(`User ${newUser.email} registred`, {
      service: AuthService.name,
    });
    return tokens;
  }

  public async login(dto: CreateAuthInput) {
    const user = await this.repository.foundUser(dto);

    if (!user) {
      throw new NotFoundException('User are not exist!');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.jwtTokenService.signTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.jwtTokenService.updateRtHash(user.id, tokens.refreshToken);
    this.logger.info(`User ${user.email} log in`, {
      service: AuthService.name,
    });
    return tokens;
  }

  public async hashData(data: string) {
    const saltOfRounds = 10;
    return await bcrypt.hash(data, saltOfRounds);
  }
}
