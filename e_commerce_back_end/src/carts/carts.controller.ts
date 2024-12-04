// carts.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createCartDto: CreateCartDto, @Req() req) {
    return this.cartsService.create(createCartDto);
  }

  @Get('/me')
  getMyCart(@Req() req) {
    return this.cartsService.getMyCart(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }
}
