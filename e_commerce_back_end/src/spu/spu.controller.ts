import { PaginationDto } from 'src/common/paging/paging.dto';
// spu.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SpuService } from './spu.service';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { SearchSpuDto } from './dto/search-spu.dto';
import { spu } from '@prisma/client';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('spu')
export class SpuController {
  constructor(
    private readonly spuService: SpuService,
    private prismaService: PrismaService,
  ) {}

  // Thêm mới SPU
  @Post()
  async createSpu(@Body() createSpuDto: CreateSpuDto) {
    return this.spuService.createSpu(createSpuDto);
  }

  @Post('sku')
  @UseGuards(AccessTokenGuard)
  async createSku(
    @Req() req,
    @Body()
    body: {
      product_name: string;
      sku_name: string;
      sku_description: string;
      spu_id: number;
      sku_stock: number;
      sku_price: number;
      sku_attri: any;
    },
  ) {
    return this.spuService.createSkuAndSkuAttribute(body, req.user.sub);
  }

  // Cập nhật SPU
  @Put(':id')
  async updateSpu(@Param('id') id: number, @Body() updateSpuDto: UpdateSpuDto) {
    return this.spuService.updateSpu(id, updateSpuDto);
  }

  // Xóa SPU

  // Tìm kiếm SPU theo tên sản phẩm
  @Get('search')
  async searchSpu(@Query() searchSpuDto: SearchSpuDto) {
    return this.spuService.searchSpu(searchSpuDto);
  }

  // Phân trang SPU
  @Get()
  async findAllPaginated(@Query() paginateSpuQuery: PaginationDto) {
    const { cursor, take } = paginateSpuQuery;
    return this.spuService.findAllPaginated(cursor, take);
  }

  // Phân trang SPU
  @Get('/cate/:id')
  async getListProductBuCate(
    @Query() paginateSpuQuery: PaginationDto,
    @Param('id') id: string,
  ) {
    const { cursor, take } = paginateSpuQuery;
    return this.spuService.getSpuByCate(cursor, take, +id);
  }

  @Get('top')
  async getTopList(@Query() paginateSpuQuery: PaginationDto) {
    const { cursor, take } = paginateSpuQuery;
    return this.spuService.getTopProductSort(cursor, take);
  }

  @Get('/:id/detail')
  async getDetailProduct(@Param('id') id: string) {
    return this.spuService.getProductWithAttributes(+id);
  }

  @Get('/my-shop')
  @UseGuards(AccessTokenGuard)
  async getProductMyShop(@Req() req) {
    const { sub } = req.user;
    return this.spuService.getMyProduct(sub);
  }

  @Delete('/:id')
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: string) {
    return this.prismaService.spu.update({
      where: { id: +id },
      data: {
        is_deleted: true,
      },
    });
  }
}
