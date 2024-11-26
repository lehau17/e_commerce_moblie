// shops.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';
import { ShopsService } from './shop.service';
import { PaginationDto } from 'src/common/paging/paging.dto';
import { shops } from '@prisma/client';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  // Thêm mới Shop
  @Post()
  async createShop(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.createShop(createShopDto);
  }

  // Cập nhật Shop
  @Put(':id')
  async updateShop(
    @Param('id') id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.updateShop(id, updateShopDto);
  }

  // Xóa Shop
  @Delete(':id')
  async deleteShop(@Param('id') id: number) {
    return this.shopsService.deleteShop(id);
  }

  // Tìm kiếm Shop theo tên
  @Get('search')
  async searchShops(@Query() searchShopDto: SearchShopDto) {
    return this.shopsService.searchShops(searchShopDto);
  }

  // Phân trang Shops
  @Get()
  async findAllPaginated(@Query() paginateShopsQuery: PaginationDto) {
    const { cursor, take } = paginateShopsQuery;
    return this.shopsService.findAllPaginated(cursor, take);
  }
}
