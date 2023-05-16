import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: 200, description: 'login swagger' })
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('/register')
  @ApiResponse({ status: 200, description: 'register swagger' })
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('/logout')
  @ApiResponse({ status: 200, description: 'logout swagger' })
  logout() {
    return this.authService.logout();
  }
}
