import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory() {
    return await this.categoryRepository.findAll();
  }

  async createCategory(name: string) {
    const exitCategory = await this.categoryRepository.findByCondition({
      name: name,
    });
    if (exitCategory) {
      throw new HttpException('Category exited', HttpStatus.CONFLICT);
    }
    return await this.categoryRepository.create({
      name: name,
    });
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return await category.remove();
  }
}
