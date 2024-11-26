import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, payment_methods } from '@prisma/client';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.payment_methodsCreateInput): Promise<payment_methods> {
    return this.prisma.payment_methods.create({ data });
  }

  async findAll(): Promise<payment_methods[]> {
    return this.prisma.payment_methods.findMany();
  }

  async findOne(id: number): Promise<payment_methods | null> {
    return this.prisma.payment_methods.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.payment_methodsUpdateInput): Promise<payment_methods> {
    return this.prisma.payment_methods.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<payment_methods> {
    return this.prisma.payment_methods.delete({
      where: { id },
    });
  }
}
