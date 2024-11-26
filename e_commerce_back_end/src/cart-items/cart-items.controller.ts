import { PaginationDto } from './../common/paging/paging.dto';
// cart-items.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Req,
  Delete,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto, @Request() req) {
    return this.cartItemsService.create(createCartItemDto, req.user.id);
  }

  @Delete('/:id')
  removeItem(@Param('id') id: string) {
    return this.cartItemsService.remove();
  }
}
