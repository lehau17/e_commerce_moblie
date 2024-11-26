import { PaginationDto } from 'src/common/paging/paging.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto, userId: number) {
    return this.prisma.reviews.create({
      data: {
        ...createReviewDto,
        user_id: userId,
      },
    });
  }

  async findReviewOfSpu(spuId: number, { take = 20, cursor }: PaginationDto) {
    const foundReivew = await this.prisma.reviews.findMany({
      where: {
        spu_id: spuId,
      },
      take: take,
      cursor: cursor ? { id: cursor } : undefined,
    });
    return {
      data: foundReivew.slice(0, take), // Return the paginated data, excluding the extra record
      nextCursor:
        foundReivew.length > take
          ? foundReivew[foundReivew.length - 1].id
          : null,
      filter: {
        cursor: cursor || null,
        take,
      },
    };
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.reviews.update({
      where: { id },
      data: { ...updateReviewDto },
    });
  }

  remove(id: number) {
    return this.prisma.reviews.delete({
      where: {
        id,
      },
    });
  }
}
