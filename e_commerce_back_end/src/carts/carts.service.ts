import { cart_items } from './../../node_modules/.prisma/client/index.d';
// carts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // PrismaService đã được tạo sẵn trong NestJS
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCartByUser(userId: number) {
    return await this.prisma.carts.findFirst({ where: { user_id: userId } });
  }

  async create(createCartDto: CreateCartDto) {
    return this.prisma.carts.create({
      data: {
        user_id: createCartDto.user_id,
      },
    });
  }

  async getMyCart(userId: number) {
    const cart = await this.prisma.carts.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        cart_items: {
          include: {
            sku: {
              include: {
                spu: {
                  include: {
                    shops: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return this.transformCartData(cart);
  }

  transformCartData(cartData: any) {
    const shopsMap = new Map();

    cartData.cart_items.forEach((item: any) => {
      const shopId = item.sku.spu.shops.id;
      const shopInfo = item.sku.spu.shops;

      if (!shopsMap.has(shopId)) {
        shopsMap.set(shopId, {
          shop: {
            id: shopInfo.id,
            shop_name: shopInfo.shop_name,
            description: shopInfo.description,
            website_url: shopInfo.website_url,
            logo_url: shopInfo.logo_url,
          },
          spus: [],
        });
      }

      const spu = item.sku.spu;
      let spuEntry = shopsMap
        .get(shopId)
        .spus.find((s: any) => s.id === spu.id);

      if (!spuEntry) {
        spuEntry = {
          id: spu.id,
          product_id: spu.product_id,
          category_id: spu.category_id,
          product_name: spu.product_name,
          spu_code: spu.spu_code,
          product_status: spu.product_status,
          product_shop: spu.product_shop,
          is_deleted: spu.is_deleted,
          sort: spu.sort,
          image: spu.image,
          description: spu.description,
          skus: [],
        };
        shopsMap.get(shopId).spus.push(spuEntry);
      }

      spuEntry.skus.push({
        id: item.sku.id,
        sku_no: item.sku.sku_no,
        sku_name: item.sku.sku_name,
        sku_description: item.sku.sku_description,
        sku_type: item.sku.sku_type,
        status: item.sku.status,
        sort: item.sku.sort,
        sku_stock: item.sku.sku_stock,
        sku_price: item.sku.sku_price,
        quantity: item.quantity,
        total_price: item.total_price,
      });
    });

    return Array.from(shopsMap.values());
  }

  async findAll() {
    return this.prisma.carts.findMany();
  }

  async findOne(id: number) {
    return this.prisma.carts.findUnique({
      where: { id },
      include: {
        cart_items: true, // Include cart items
      },
    });
  }
}
