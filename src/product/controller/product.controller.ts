import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productService: ProductService,
  ) {}
  @Get()
  getAllProduct() {
    return this.productService.getAllProduct();
  }
  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
  @Get('search/:name')
  searchProduct(@Param('name') name: string) {
    return this.productService.searchProductByName(name);
  }
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(@UploadedFile() file, @Body() product: CreateProductDto) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);
    const urlImage = uploadResult.url;
    const publicId = uploadResult.public_id;
    return this.productService.createProduct(urlImage, publicId, product);
  }
  @Put('/')
  updateProduct() {
    return 'updateProduct';
  }
  @Delete(':product_id')
  async deleteProduct(@Param('product_id') product_id: string) {
    return await this.productService.deleteProduct(product_id);
  }
}
