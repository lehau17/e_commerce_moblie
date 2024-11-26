import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping_address.dto';

@Injectable()
export class ShippingAddressesService {
  constructor(private prisma: PrismaService) {}

  async getAddressForme(userId: number) {
    return this.prisma.shipping_addresses.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async create(data: CreateShippingAddressDto) {
    return this.prisma.shipping_addresses.create({ data });
  }

  async findAll() {
    return this.prisma.shipping_addresses.findMany();
  }

  async findOne(id: number) {
    return this.prisma.shipping_addresses.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateShippingAddressDto) {
    return this.prisma.shipping_addresses.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.shipping_addresses.delete({ where: { id } });
  }
}
