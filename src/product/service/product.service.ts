import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async searchProductByName(name: string) {
    const listProduct = await this.productRepository.findAllProductByCondition({
      name: name,
    });
    return listProduct;
  }
  async createProduct(
    url: string,
    public_id: string,
    product: CreateProductDto,
  ) {
    const newProduct = await this.productRepository.create({
      image_url: url,
      public_id,
      ...product,
    });
    return newProduct;
  }

  async deleteProduct(product_id: string) {
    const product = await this.productRepository.findByCondition({
      _id: product_id,
    });
    if (product) {
      await this.cloudinaryService.deleteFile(product.public_id);
      const result = await this.productRepository.deleteOne(product_id);
      return result;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
