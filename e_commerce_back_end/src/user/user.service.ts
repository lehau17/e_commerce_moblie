import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, users } from '@prisma/client';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartsService,
  ) { }

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    const userCreated = await this.prisma.users.create({
      data,
    });
    if (userCreated) {
      await this.cartService.create({ user_id: userCreated.id });
    }
    return userCreated;
  }

  findUserBeUserName(email: string) {
    return this.prisma.users.findFirst({ where: { email: email } });
  }

  // Get a user by ID
  async getUserById(id: number): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  // Update a user by ID
  async updateUser(id: number, data: Prisma.usersUpdateInput): Promise<users> {
    if (data && data.email) {
      const foundUser = await this.prisma.users.findUnique({ where: { email: data.email as string } })
      if (foundUser) {
        throw new BadRequestException("Email đã tồn tại")
      }
    }
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }

  // Get all users
  async getAllUsers(): Promise<users[]> {
    return this.prisma.users.findMany();
  }
}
