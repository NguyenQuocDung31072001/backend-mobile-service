import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/cart.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './purchase.model';
import { CreatePurchaseDto } from './purchase.dto';

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

  async createPurchase(data: CreatePurchaseDto) {
    const listCartByUser: Cart[] = await this.cartService.getCartByUser(
      data.id_user,
    );
    const listCartByUserCloned = JSON.parse(JSON.stringify(listCartByUser));

    const newPurchase = await this.purchaseRepository.create({
      user: data.id_user,
      product: listCartByUser.map((_cart) => {
        _cart.product.quantity = _cart.quantity;
        return _cart.product;
      }),
      product_info: listCartByUserCloned.map((_cart: any) => {
        _cart.product.quantity = _cart.quantity;
        return _cart.product;
      }),
      shipping_address: data.shipping_address,
      credit_card_number: data.credit_card_number,
      expired_date: data.expired_date,
      cvv: data.cvv,
      status: 'success',
    });
    console.log({ newPurchase: JSON.stringify(newPurchase) });

    await this.cartService.deleteCartByUser(data.id_user);

    return newPurchase;
  }
}
