import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.prisma.comments.create({
      data: {
        ...createCommentDto,
        user_id: userId,
      },
      include: { users: true },
    });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comments.update({
      where: {
        id: id,
      },
      data: { ...updateCommentDto },
    });
  }

  remove(id: number) {
    return this.prisma.comments.delete({ where: { id } });
  }

  findCommentOfSpu(spu_id: number) {
    return this.prisma.comments.findMany({
      where: {
        spu_id,
      },
      include: {
        users: true,
      },
    });
  }
}
