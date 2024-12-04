import { Length } from 'class-validator';
// spu.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { SearchSpuDto } from './dto/search-spu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopsService } from 'src/shop/shop.service';

@Injectable()
export class SpuService {
  constructor(
    private prisma: PrismaService,
    private shopSerice: ShopsService,
  ) {}

  async createSkuAndSkuAttribute(
    {
      sku_attri,
      sku_description,
      sku_name,
      sku_price,
      sku_stock,
      spu_id,
      product_name,
    }: {
      product_name: string;
      sku_name: string;
      sku_description: string;
      spu_id: number;
      sku_stock: number;
      sku_price: number;
      sku_attri: any;
    },
    user_id: number,
  ) {
    const spu = await this.prisma.spu.create({
      data: {
        product_name,
        product_id: new Date().getTime(),
        shops: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    const sku = await this.prisma.sku.create({
      data: {
        sku_no: new Date().getTime().toString(),
        sku_description: sku_description,
        sku_name,
        sku_price,
        sku_stock,
        spu: {
          connect: {
            id: spu.id,
          },
        },
      },
    });
    await this.prisma.sku_attr.create({
      data: {
        spu_specs: sku_attri,
        sku_id: sku.id,
      },
    });
    return sku;
  }

  // Thêm mới SPU
  async createSpu(createSpuDto: CreateSpuDto) {
    return this.prisma.spu.create({
      data: { ...createSpuDto, product_id: new Date().getTime() },
    });
  }

  async getProductWithAttributes(productId: number) {
    const product = await this.prisma.spu.findUnique({
      where: { id: productId },
      include: {
        sku: {
          where: {
            status: 1, // Filter only active SKUs
          },
          include: {
            sku_attr: true, // Fetch all SKU attributes for each SKU
          },
        },
      },
    });

    // Step 1: Create the types object to store unique values for each attribute
    const types: { [key: string]: string[] } = {};

    // Step 2: Create the matrix to store the index combinations
    const matrix: number[][] = [];

    const formattedProduct: any = {
      ...product,
      sku: product.sku.map((sku) => {
        sku.sku_attr.forEach((skuAttr) => {
          if (skuAttr.spu_specs && typeof skuAttr.spu_specs === 'object') {
            // Update types with unique values for each attribute
            Object.entries(skuAttr.spu_specs).forEach(([key, value]) => {
              if (!types[key]) {
                types[key] = [];
              }
              if (!types[key].includes(value.toString())) {
                types[key].push(value.toString());
              }
            });

            // Step 3: Create the matrix with indices of combinations
            const skuSpecs = skuAttr.spu_specs;
            const skuKeys = Object.keys(skuSpecs);

            // Find the combination indices and push to the matrix
            const indices: number[] = [];

            skuKeys.forEach((key) => {
              const index = types[key].indexOf(skuSpecs[key].toString());
              if (index !== -1) {
                indices.push(index); // Push the index of each attribute value
              }
            });

            if (indices.length > 0) {
              matrix.push(indices); // Add the index combination to the matrix
            }
          }
        });

        return sku;
      }),
    };

    formattedProduct.types = types; // Store the unique attribute values
    formattedProduct.matrix = matrix; // Store the index combinations

    return formattedProduct;
  }

  // Xóa SPU
  async deleteSpu(id: number) {
    const spu = await this.prisma.spu.findUnique({ where: { id } });
    if (!spu) {
      throw new NotFoundException(`SPU with ID ${id} not found`);
    }

    return this.prisma.spu.delete({
      where: { id },
    });
  }

  // Tìm kiếm SPU theo tên sản phẩm
  async searchSpu(searchSpuDto: SearchSpuDto) {
    const { product_name } = searchSpuDto;

    return this.prisma.spu.findMany({
      where: {
        product_name: {
          contains: product_name, // Tìm kiếm theo tên sản phẩm
          mode: 'insensitive', // Không phân biệt chữ hoa chữ thường
        },
      },
    });
  }

  async getTopProductSort(cursor: number | null, take: number = 20) {
    const spuList = await this.prisma.spu.findMany({
      take: take + 1, // Fetch an extra record to check if there's a next page
      skip: cursor ? 1 : 0, // Skip the cursor item if provided
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ sort: 'desc' }, { create_time: 'desc' }],
      include: {
        sku: {
          orderBy: { sku_price: 'asc' }, // Order SKUs by price in ascending order
          take: 1, // Take only the lowest-priced SKU
        },
      },
    });

    return {
      data: spuList.slice(0, take), // Return the paginated data, excluding the extra record
      nextCursor: spuList.length > take ? spuList[spuList.length - 1].id : null,
      filter: {
        cursor: cursor || null,
        take,
      },
    };
  }

  // Cập nhật SPU
  async updateSpu(id: number, updateSpuDto: UpdateSpuDto) {
    const spu = await this.prisma.spu.findUnique({ where: { id } });
    if (!spu) {
      throw new NotFoundException('SPU with ID ${id} not found');
    }

    return this.prisma.spu.update({
      where: { id },
      data: updateSpuDto,
    });
  }

  // Phân trang SPU
  async findAllPaginated(cursor: number | null, take: number = 20) {
    const spuList = await this.prisma.spu.findMany({
      take: take + 1, // Lấy thêm 1 bản ghi để kiểm tra trang tiếp theo
      skip: cursor ? 1 : 0, // Bỏ qua bản ghi cursor nếu có
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { create_time: 'desc' },
    });

    return {
      data: spuList.slice(0, take),
      nextCursor: spuList[spuList.length - 1].id || null,
      filter: {
        cursor: cursor || null,
        take,
      },
    }; // Trả về danh sách SPU sau khi loại bỏ bản ghi phụ
  }

  async getSpuByCate(cursor: number | null, take: number = 20, cateId: number) {
    const spuList = await this.prisma.spu.findMany({
      where: {
        category_id: cateId,
      },
      take: take + 1, // Lấy thêm 1 bản ghi để kiểm tra trang tiếp theo
      skip: cursor ? 1 : 0, // Bỏ qua bản ghi cursor nếu có
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { create_time: 'desc' },
      include: {
        sku: {
          orderBy: { sku_price: 'asc' }, // Order SKUs by price in ascending order
          take: 1, // Take only the lowest-priced SKU
        },
      },
    });

    const lenght = spuList.length;

    return {
      data: spuList.slice(0, take),
      nextCursor: lenght > take ? spuList[lenght - 1].id : null,

      filter: {
        cursor: cursor || null,
        take,
      },
    }; // Trả về danh sách SPU sau khi loại bỏ bản ghi phụ
  }

  async getMyProduct(user_id: number) {
    const foundRestaurant = await this.shopSerice.findShopByUser(user_id);
    if (!foundRestaurant)
      throw new BadRequestException(`User ${user_id} not found`);
    const data = await this.prisma.$queryRaw`SELECT 
  sku.id,
  sku.sku_no,
  sku.sku_name,
  sku.sku_description,
  sku.sku_type,
  sku.status,
  sku.sort,
  sku.sku_stock,
  sku.sku_price,
  sku.create_time,
  sku.update_time,
  spu.id AS spu_id,
  spu.product_name,
  spu.spu_code,
  spu.product_status,
  spu.product_shop,
  spu.is_deleted,
  spu.sort AS spu_sort,
  spu.image,
  spu.create_time AS spu_create_time,
  spu.update_time AS spu_update_time,
  spu.description AS spu_description
FROM sku
JOIN spu ON sku.spu_id = spu.id 
where spu.product_shop = ${foundRestaurant.id} and is_deleted = false`;
    console.log(data);
    return data;
  }
}
