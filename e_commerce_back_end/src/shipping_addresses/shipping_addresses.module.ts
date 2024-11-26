import { Module } from '@nestjs/common';
import { ShippingAddressesService } from './shipping_addresses.service';
import { ShippingAddressesController } from './shipping_addresses.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShippingAddressesController],
  providers: [ShippingAddressesService, PrismaService],
})
export class ShippingAddressesModule {}
