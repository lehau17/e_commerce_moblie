// shops.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { shops } from '@prisma/client';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  // Thêm mới Shop
  async createShop(createShopDto: CreateShopDto) {
    return this.prisma.shops.create({ data: { ...createShopDto } });
  }

  // Cập nhật Shop
  async updateShop(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.prisma.shops.findUnique({ where: { id } });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    return this.prisma.shops.update({
      where: { id },
      data: updateShopDto,
    });
  }

  // Xóa Shop
  async deleteShop(id: number) {
    const shop = await this.prisma.shops.findUnique({ where: { id } });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    return this.prisma.shops.delete({
      where: { id },
    });
  }

  // Tìm kiếm Shop
  async searchShops(searchShopDto: SearchShopDto) {
    const { shop_name } = searchShopDto;

    return this.prisma.shops.findMany({
      where: {
        shop_name: {
          contains: shop_name, // Tìm kiếm theo tên shop
          mode: 'insensitive', // Không phân biệt chữ hoa chữ thường
        },
      },
    });
  }
  findShopByUser(user_id: number) {
    return this.prisma.shops.findFirst({
      where: {
        user_id: user_id,
      },
    });
  }

  // Phân trang Shops
  async findAllPaginated(cursor: number | null, take: number = 20) {
    const shops = await this.prisma.shops.findMany({
      take: take + 1, // Lấy thêm 1 bản ghi để kiểm tra trang tiếp theo
      skip: cursor ? 1 : 0, // Bỏ qua bản ghi cursor nếu có
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
    });

    return {
      data: shops.slice(0, take),
      nextCursor: shops[shops.length - 1].id || null,
      filter: {
        cursor: cursor || null,
        take,
      },
    }; // Trả về danh sách Shops sau khi loại bỏ bản ghi phụ
  }
}
