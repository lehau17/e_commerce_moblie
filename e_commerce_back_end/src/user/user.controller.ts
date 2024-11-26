import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/deco/public';
import { Message } from 'src/common/deco/message';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Public()
  @Message('fetch all users')
  findAll() {
    return this.userService.getAllUsers();
  }


  @Get("/me")
  getMyProfile(@Req() req) {
    return this.userService.findUserBeUserName(req.user.username)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }


  @Patch('/update/me')
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(req.user.sub, updateUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
