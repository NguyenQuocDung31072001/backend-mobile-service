import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Post()
  addNewCategory(@Body() name: { name: string }) {
    return this.categoryService.createCategory(name.name);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
