import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/cart.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './purchase.model';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('Purchase')
    private readonly purchaseModel: Model<Purchase>,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly cartService: CartService,
  ) {}

  async getPurchaseByUser(id_user: string) {
    const field: any = { user: id_user };
    return await this.purchaseModel
      .find(field)
      .populate({ path: 'user' })
      .populate({ path: 'product' });
  }

  async createPurchase(id_user: string) {
    const listCartByUser: Cart[] =
      await this.cartService.getCartByUserDontPopulate(id_user);

    const newPurchase = await this.purchaseRepository.create({
      user: id_user,
      product: listCartByUser.map((_cart) => _cart.product),
      status: 'success',
    });
    await this.cartService.deleteCartByUser(id_user);

    return newPurchase;
  }
}
