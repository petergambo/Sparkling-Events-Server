/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAirtimeReloadlyDto } from './dto/create-airtime-reloadly.dto';
import { fetchExternal, getReloadlyToken } from 'src/helpers/fetchExternal';
import { RequestType } from 'src/helpers/@types';
import { RELOADLY_AIRTIME_URL } from 'src/config/constants';
import { generateVTPassRequestId } from 'src/utils/functions';
import { AxiosHeaders } from 'axios';

// type Provider []

@Injectable()
export class AirtimeReloadlyService {
  async purchase(createAirtimeDto: CreateAirtimeReloadlyDto) {
    const reloadlyToken = await getReloadlyToken("airtime-data")

    // const headers = VTPASS_HEADER_CONFIG;
    const headers = new AxiosHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/com.reloadly.topups-v1+json',
      Authorization: `Bearer ${reloadlyToken}`
    })

    const url = `${RELOADLY_AIRTIME_URL}`

    const completeAirtimeDTO = { ...createAirtimeDto, customIdentifier: generateVTPassRequestId() }

    const response = await fetchExternal(url, RequestType.POST, headers, completeAirtimeDTO)
    return response

  }

  async getOperators() {

    const reloadlyToken = await getReloadlyToken("airtime-data")

    // const headers = VTPASS_HEADER_CONFIG;
    const headers = new AxiosHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/com.reloadly.topups-v1+json',
      Authorization: `Bearer ${reloadlyToken}`
    })

    console.log(headers)


    const response = await fetchExternal('https://topups-sandbox.reloadly.com/operators', RequestType.GET, headers,)
    console.log("response", response)

    return response

  }

}
