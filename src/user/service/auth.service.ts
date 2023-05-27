import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(user: LoginDto): Promise<any> {
    const exitUser = await this.userRepository.findByCondition({
      email: user.email,
    });
    if (!exitUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (exitUser.password !== user.password) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }
    return exitUser;
  }
  async register(user: RegisterDto): Promise<string> {
    const exitUser = await this.userRepository.findByCondition({
      email: user.email,
    });
    if (exitUser) {
      throw new HttpException(
        `${user.email} already taken`,
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
  logout(): string {
    return 'logout';
  }
}
