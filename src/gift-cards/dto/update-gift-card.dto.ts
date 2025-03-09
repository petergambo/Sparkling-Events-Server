import { PartialType } from '@nestjs/mapped-types';
import { CreateGiftCardDto } from './create-gift-card.dto';

export class UpdateGiftCardDto extends PartialType(CreateGiftCardDto) {}
