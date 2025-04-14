/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBillsPayDto, MerchantVerifyDTO } from './dto/create-bills-pay.dto';
import { VariationType } from './type';
import axios from 'axios';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BillsPayService {

  constructor(
    private readonly databaseService: DatabaseService, 
  ){}
  
  async makePayment(requestBody: CreateBillsPayDto): Promise<any> {
    
    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.VTPASS_API_KEY!,
      'public-key': process.env.VTPASS_PUBLIC_KEY!,
      'secret-key': process.env.VTPASS_SECRET_KEY!,
    };

    try {
      const response = await axios.post('https://sandbox.vtpass.com/api/pay', requestBody, { headers });

     

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment API call failed');
    }
  }

 async updateVariationsFromProvider(serviceID: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      'public-key': process.env.PUBLIC_KEY!,
      'secret-key': process.env.SECRET_KEY!,
    };

    console.log(headers)

    try {
      const response = await axios.get(`https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`, { headers });
      
      if(response.status == 200 || response.status == 201)
      {
        const dataList: VariationType[] = response.data.content.variations

        console.log(dataList)
        
        dataList.map(async (variation)=> await this.databaseService.variations.upsert({
          where: {variation_code: variation.variation_code},
          create: {
          variation_amount: variation.variation_amount, 
          variation_code: variation.variation_code, 
          name: variation.name, 
          fixedPrice: variation.fixedPrice, 
          service: serviceID,},
          
          update: {
            variation_amount: variation.variation_amount, 
            variation_code: variation.variation_code, 
            name: variation.name, 
            fixedPrice: variation.fixedPrice, 
            service: serviceID,
          }
        }
      )
        )

      }
      return "variations updated successfully";
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment API call failed');
    }
  }

  async updateSingleVariation(updateVariationDto: VariationType, variationCode: string): Promise<any> {

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'api-key': process.env.API_KEY!,
    //   'public-key': process.env.PUBLIC_KEY!,
    //   'secret-key': process.env.SECRET_KEY!,
    // };

    await this.databaseService.variations.upsert({
      where: {variation_code: variationCode},
      create: {
      variation_amount: updateVariationDto.variation_amount, 
      variation_code: updateVariationDto.variation_code, 
      name: updateVariationDto.name, 
      fixedPrice: updateVariationDto.fixedPrice, 
      service: updateVariationDto.serviceID},
      
      update: {
        variation_amount: updateVariationDto.variation_amount, 
        variation_code: updateVariationDto.variation_code, 
        name: updateVariationDto.name, 
        fixedPrice: updateVariationDto.fixedPrice, 
        service: updateVariationDto.serviceID,
      }
    }
  )


      return "variation updated successfully";
  }

  async airtimeVariations(serviceId: string): Promise<any> {
    return await this.databaseService.variations.findMany({ where: {service: serviceId} });
  }

  async dataVariations(serviceId: string): Promise<any> {
    return await this.databaseService.variations.findMany({ where: {service: serviceId} });
  }

  async billsPayVariations(serviceId: string): Promise<any> {
    return await this.databaseService.variations.findMany({ where: {service: serviceId} });
  }

  async cableCodeVerify(merchantVerifyDTO: MerchantVerifyDTO): Promise<any> {
    
    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.VTPASS_API_KEY!,
      'public-key': process.env.VTPASS_PUBLIC_KEY!,
      'secret-key': process.env.VTPASS_SECRET_KEY!,
    };

    try {
      const response = await axios.post('https://sandbox.vtpass.com/api/merchant-verify', merchantVerifyDTO, { headers });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment API call failed');
    }
  }

}
