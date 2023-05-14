import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, UserRepository],
})
export class UserModule {}
