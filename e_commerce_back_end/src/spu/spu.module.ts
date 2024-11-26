import { Module } from '@nestjs/common';
import { SpuService } from './spu.service';
import { SpuController } from './spu.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopsService } from 'src/shop/shop.service';

@Module({
  controllers: [SpuController],
  providers: [SpuService, PrismaService, ShopsService],
})
export class SpuModule {}
