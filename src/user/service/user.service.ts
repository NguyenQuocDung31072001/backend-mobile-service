import { UserRepository } from './../repositories/user.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { UpdateInfoUser } from '../dto/user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
  ) {}

  async updateInfoUser(id: string, @UploadedFile() file, user: UpdateInfoUser) {
    const userModel = await this.userRepository.findById(id);
    if (!userModel) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (file) {
      if (userModel.public_id) {
        await this.cloudinaryService.deleteFile(userModel.public_id);
      }
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      const urlImage = uploadResult.url;
      const publicId = uploadResult.public_id;
      userModel.avatar_url = urlImage;
      userModel.public_id = publicId;
    }

    userModel.username = user.username ? user.username : userModel.username;
    userModel.email = user.email ? user.email : userModel.email;
    userModel.phone_number = user.phone_number
      ? user.phone_number
      : userModel.phone_number;
    userModel.fullname = user.fullname ? user.fullname : userModel.fullname;
    userModel.address = user.address ? user.address : userModel.address;
    const result = await userModel.save();
    return result;
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }
    user.password = newPassword;
    return await user.save();
  }
}
