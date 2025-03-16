/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PurchaseAirtimeDto } from './dto/create-airtime.dto';
import { fetchExternal } from 'src/helpers/fetchExternal';
import { RequestType } from 'src/helpers/@types';
import { AIRTIME_PROVIDER, VTPASS_HEADER_CONFIG } from 'src/config/constants';
import { generateVTPassRequestId } from 'src/utils/functions';


// type Provider []

@Injectable()
export class AirtimeService {
  async purchase(createAirtimeDto: PurchaseAirtimeDto) {
    // const headers = VTPASS_HEADER_CONFIG;
    const headers = VTPASS_HEADER_CONFIG

    const url = `${AIRTIME_PROVIDER}/api/pay`

    const completeAirtimeDTO = { ...createAirtimeDto, request_id: generateVTPassRequestId() }

    const response = await fetchExternal(url, RequestType.POST, headers, completeAirtimeDTO)
    return response

  }

}
