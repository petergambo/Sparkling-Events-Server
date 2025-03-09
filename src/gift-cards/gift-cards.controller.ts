import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';

@Controller('gift-cards')
export class GiftCardsController {
  constructor(private readonly giftCardsService: GiftCardsService) {}

  @Post()
  create(@Body() createGiftCardDto: CreateGiftCardDto) {
    return this.giftCardsService.create(createGiftCardDto);
  }

  @Get()
  findAll() {
    return this.giftCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftCardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftCardDto: UpdateGiftCardDto) {
    return this.giftCardsService.update(+id, updateGiftCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftCardsService.remove(+id);
  }
}
