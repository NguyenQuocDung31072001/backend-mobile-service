import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
