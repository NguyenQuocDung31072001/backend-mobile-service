import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get(':id')
  getPurchaseByUser(@Param('id') id: string) {
    return this.purchaseService.getPurchaseByUser(id);
  }

  @Post()
  createPurchase(@Body() data: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(data);
  }
}
