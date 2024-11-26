import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartsService } from 'src/carts/carts.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService, CartsService],
})
export class CartItemsModule {}
