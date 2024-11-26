// cart-items.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class CartItemsService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartsService,
  ) { }

  async create(createCartItemDto: CreateCartItemDto, user_id: number) {
    let foundCart = await this.cartService.getCartByUser(user_id);
    if (!foundCart) {
      foundCart = await this.prisma.carts.create({
        data: {
          user_id: user_id,
        },
      });
    }
    const foundCartItem = await this.prisma.cart_items.findFirst({
      where: {
        sku_id: createCartItemDto.sku_id,
        cart_id: foundCart.id,
      },
    });

    const foundSku = await this.prisma.sku.findFirst({
      where: { id: createCartItemDto.sku_id },
    });
    if (!foundSku) {
      throw new BadRequestException('Sku not found');
    }

    // If item exists, update the quantity and total price
    if (foundCartItem) {
      return this.prisma.cart_items.update({
        where: {
          cart_id_sku_id: {
            cart_id: foundCart.id, // Sử dụng cart_id và sku_id để xác định bản ghi
            sku_id: createCartItemDto.sku_id,
          },
        },
        data: {
          quantity: foundCartItem.quantity + createCartItemDto.quantity, // Tính lại tổng tiền
        },
      });
    }

    // If item does not exist, create a new cart item
    return this.prisma.cart_items.create({
      data: {
        carts: {
          connect: {
            id: foundCart.id
          }
        }, // Đảm bảo sử dụng foundCart.id thay vì createCartItemDto.cart_id
        sku: {
          connect: {
            id: createCartItemDto.sku_id
          }
        },
        quantity: createCartItemDto.quantity,
        price: foundSku.sku_price,
      },
    });
  }

  async update(id: number, updateCartItemDto: CreateCartItemDto) {
    return null;
  }

  async remove() {
    return null;
  }
}
