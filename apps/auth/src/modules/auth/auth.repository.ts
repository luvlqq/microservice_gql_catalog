import { PrismaService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async foundUser(dto: CreateAuthInput): Promise<User> {
    return this.prisma.user.findUnique({ where: { email: dto.email } });
  }

  public async foundUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: +userId } });
  }

  public async createUser(
    dto: CreateAuthInput,
    hashPassword: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { email: dto.email, password: hashPassword },
    });
  }

  public async updateRtHash(userId: number, hash: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
