import { spu } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { Order } from './entities/order.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private prisma: PrismaService,
  ) {}

  @Patch('/:id/change-status')
  changeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.prisma.orders.update({
      where: { id: +id },
      data: {
        status,
      },
    });
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.orderService.create(createOrderDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('my-food-order')
  @UseGuards(AccessTokenGuard)
  async listFoodUserOrder(@Req() req) {
    const { sub } = req.user;
    const foundListOrder = await this.prisma.orders.findMany({
      where: {
        user_id: sub,
      },
    });
    const foundListOrderDetail = await this.prisma.order_details.findMany({
      where: {
        order_id: { in: foundListOrder.map((item) => item.id) },
      },
    });
    const foundListSku = await this.prisma.sku.findMany({
      where: {
        id: { in: foundListOrderDetail.map((item) => item.sku_id) },
      },
      include: {
        spu: true,
      },
    });
    return foundListSku;
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getMyOrder(@Req() req) {
    const sub = req.user.sub as number;
    return this.prisma.orders.findMany({
      where: {
        user_id: sub,
      },
      include: {
        order_details: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
