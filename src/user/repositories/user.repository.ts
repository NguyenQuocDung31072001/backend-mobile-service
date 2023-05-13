import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { User } from '../model/user.model';

@Injectable()
export class PostRepository extends BaseRepository<User> {
  constructor(
    @InjectModel('Post')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
