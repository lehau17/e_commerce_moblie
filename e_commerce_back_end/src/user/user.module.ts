import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartsService } from 'src/carts/carts.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CartsService],
  exports: [UserService],
})
export class UserModule {}
