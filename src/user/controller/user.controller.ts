import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePassword, UpdateInfoUser } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update_info/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateInfoUser(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() user: UpdateInfoUser,
  ) {
    return this.userService.updateInfoUser(id, file, user);
  }

  @Put('change_password/:id')
  async changePassword(@Param('id') id: string, @Body() info: ChangePassword) {
    return this.userService.changePassword(
      id,
      info.oldPassword,
      info.newPassword,
    );
  }
}
