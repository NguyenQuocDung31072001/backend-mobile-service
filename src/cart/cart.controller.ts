import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  getCartByUser(@Param('id') id: string) {
    return this.cartService.getCartByUser(id);
  }

  @Post()
  createCart(@Body() data: { id_user: string; id_product: string }) {
    return this.cartService.createCart(data.id_user, data.id_product);
  }

  @Patch('increase/:id')
  increaseCart(@Param('id') id: string) {
    return this.cartService.increaseCart(id);
  }

  @Patch('decrease/:id')
  decreaseCart(@Param('id') id: string) {
    return this.cartService.decreaseCart(id);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }
}
