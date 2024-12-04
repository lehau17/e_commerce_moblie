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
  UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createCartItemDto: CreateCartItemDto, @Request() req) {
    return this.cartItemsService.create(createCartItemDto, req.user.sub);
  }

  @Delete('/:id')
  removeItem(@Param('id') id: string) {
    return this.cartItemsService.remove();
  }
}
