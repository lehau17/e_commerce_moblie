import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { AccessTokenStrategy } from './accessToken.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
