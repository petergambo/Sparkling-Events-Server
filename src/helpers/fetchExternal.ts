/* eslint-disable prettier/prettier */
import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { RequestType } from "./@types"

export const fetchExternal = async (url: string, type: RequestType, requestHeaders: AxiosHeaders, requestBody: any = {}): Promise<AxiosResponse<any, any>>  => {
    const response = await httpRequest(url, type, requestHeaders, requestBody)
    return response
}



const httpRequest = async (
    url: string,
    type: RequestType,
    requestHeaders: AxiosHeaders,
    requestPostData: any = null
  ): Promise<AxiosResponse<any, any> | any> => {
    let response: AxiosResponse<any, any>;
  
    if (type === RequestType.GET) {
      response = await axios.get(url, { headers: requestHeaders });
      
    } else if (type === RequestType.POST) {
      
      console.log(requestPostData)

      response = await axios.post(url, requestPostData, { headers: requestHeaders });
    
    } else {
      throw new Error("Invalid request type");
    }
  
    if(response.status == 200 || response.status == 201)
    {
    return response.data;
    }
    else {
      return {message: "Action not successful", data: response.data}
    }
  };