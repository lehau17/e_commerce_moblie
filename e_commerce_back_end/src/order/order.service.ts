import { payment_methods } from '@prisma/client';
import { Injectable, Controller, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(
    { address_id, payment_method_id }: CreateOrderDto,
    userId: number,
  ) {
    const foundAddress = await this.prisma.shipping_addresses.findFirst({
      where: {
        id: address_id,
      },
    });
    if (!foundAddress) throw new BadRequestException('Địa chỉ không tồn tại');
    const foundPaymentMethod = await this.prisma.payment_methods.findFirst({
      where: {
        id: payment_method_id,
      },
    });
    if (!payment_method_id)
      throw new BadRequestException('Phương thức thanh toán không tồn tại');
    const carts = await this.prisma.carts.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        cart_items: true,
      },
    });

    let total_quantity = 0;
    let total_amount = 0;
    carts.cart_items.forEach((cartItem) => {
      total_quantity += cartItem.quantity;
      total_amount += Number(cartItem.total_price);
    });
    const newOrder = await this.prisma.orders.create({
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
        order_date: new Date(),
        status: 'Đang chờ xác nhận',
        total_amount,
        total_quantity,
        address: foundAddress,
        payment_methods: {
          connect: {
            id: foundPaymentMethod.id,
          },
        },
      },
    });
    if (!newOrder)
      throw new BadRequestException('Có lỗi xảy ra. Vui lòng thử lại');
    const promiseOrderDetails = carts.cart_items.map((item) => {
      return this.prisma.order_details.create({
        data: {
          orders: {
            connect: {
              id: newOrder.id,
            },
          },
          sku: {
            connect: {
              id: item.sku_id,
            },
          },
          quantity: item.quantity,
          price: item.price,
        },
      });
    });
    await Promise.all(promiseOrderDetails);
    await this.prisma.cart_items.deleteMany({
      where: {
        cart_id: carts.id,
        sku_id: { in: carts.cart_items.map((item) => item.sku_id) },
      },
    });
    return newOrder;
  }

  findAll() {
    return this.prisma.orders.findMany({
      include: { order_details: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
