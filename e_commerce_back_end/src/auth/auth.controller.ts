import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Message } from 'src/common/deco/message';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/deco/public';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @Message('Login success')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('/register')
  @Public()
  @Message('Register user')
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}
