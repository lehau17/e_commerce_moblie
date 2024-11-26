import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ShippingAddressesService } from './shipping_addresses.service';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping_address.dto';

@Controller('shipping-addresses')
export class ShippingAddressesController {
  constructor(private readonly service: ShippingAddressesService) {}

  @Post()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.service.create(createShippingAddressDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/me')
  findAddressForme(@Req() req) {
    return this.service.getAddressForme(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ) {
    return this.service.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
