/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBillsPayReloadlyDto } from './dto/create-bills-pay-reloadly.dto';
import { fetchExternal, getReloadlyToken } from 'src/helpers/fetchExternal';
import { RequestType } from 'src/helpers/@types';
import { AxiosHeaders } from 'axios';
import { generateVTPassRequestId } from 'src/utils/functions';

@Injectable()
export class BillsPayReloadlyService {
  async purchase(createAirtimeDto: CreateBillsPayReloadlyDto) {
    const reloadlyToken = await getReloadlyToken("bills-pay")

    // const headers = VTPASS_HEADER_CONFIG;
    const headers = new AxiosHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/com.reloadly.utilities-v1+json',
      Authorization: `Bearer ${reloadlyToken}`
    })

    const completeAirtimeDTO = { ...createAirtimeDto, customIdentifier: generateVTPassRequestId() }

    const response = await fetchExternal('https://utilities-sandbox.reloadly.com', RequestType.POST, headers, completeAirtimeDTO)
    return response

  }

  async getBillers() {

    const reloadlyToken = await getReloadlyToken("bills-pay")

    // const headers = VTPASS_HEADER_CONFIG;
    const headers = new AxiosHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/com.reloadly.utilities-v1+json',
      Authorization: `Bearer ${reloadlyToken}`
    })

    console.log(headers)


    const response = await fetchExternal('https://utilities-sandbox.reloadly.com/billers', RequestType.GET, headers,)
    console.log("response", response)

    return response

  }

}
