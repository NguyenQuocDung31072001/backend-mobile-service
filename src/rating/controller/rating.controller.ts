import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RatingService } from '../service/rating.service';
import {
  CreateNewRatingDto,
  DeteleRatingDto,
  UpdateRatingDto,
} from '../dto/rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':id_product')
  getRatingByProduct(@Param('id_product') id_product: string) {
    return this.ratingService.getRatingByProduct(id_product);
  }

  @Post()
  createNewRating(@Body() data: CreateNewRatingDto) {
    return this.ratingService.createRating(
      data.id_user,
      data.id_product,
      data.rating,
      data.comment,
    );
  }

  @Patch(':id')
  updateRating(@Param('id') id: string, @Body() data: UpdateRatingDto) {
    return this.ratingService.updateRating(id, data.new_rating);
  }

  @Delete(':id')
  deteleRating(@Param('id') id: string, @Body() data: DeteleRatingDto) {
    return this.ratingService.deleteRating(id, data.id_product);
  }
}
