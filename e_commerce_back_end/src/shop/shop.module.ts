import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopsController } from './shop.controller';
import { ShopsService } from './shop.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService, PrismaService],
})
export class ShopModule {}
