import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('/register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
