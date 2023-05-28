import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCartByUser(id_user) {
    const listCartByUser = await this.cartRepository.findByConditionAndPopulate(
      {
        user: id_user,
      },
    );
    console.log({ listCartByUser });
    return listCartByUser;
  }

  async createCart(id_user: string, id_product: string) {
    const cart = await this.cartRepository.findByCondition({
      user: id_user,
      product: id_product,
    });
    if (cart) {
      cart.quantity += 1;
      return cart.save();
    }
    return await this.cartRepository.create({
      user: id_user,
      product: id_product,
      quantity: 1,
    });
  }

  async increaseCart(id_cart: string) {
    const cart = await this.cartRepository.findById(id_cart);
    cart.quantity += 1;
    return await cart.save();
  }

  async decreaseCart(id_cart: string) {
    const cart = await this.cartRepository.findById(id_cart);
    if (cart.quantity === 1) {
      throw new HttpException(
        'Quantity of cart cannot decrease',
        HttpStatus.CONFLICT,
      );
    }
    cart.quantity -= 1;
    return await cart.save();
  }

  async deleteCart(id: string) {
    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    return cart.remove();
  }
}
