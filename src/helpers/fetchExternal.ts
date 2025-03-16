/* eslint-disable prettier/prettier */
import axios, { AxiosHeaders, AxiosResponse } from "axios"
import { RequestType } from "./@types"
import { RELOADLY_AUTH_HEADER_CONFIG, RELOADLY_AUTH_URL } from "src/config/constants"

let existingAirtimeDataToken = null

let existingBillsToken = null

export const fetchExternal = async (url: string, type: RequestType, requestHeaders: AxiosHeaders, requestBody: any = {}): Promise<AxiosResponse<any, any>>  => {
    const response = await httpRequest(url, type, requestHeaders, requestBody)
    return response
}

export const getReloadlyToken = async (type: string) => {
  if (type === "airtime-data" && existingAirtimeDataToken == null)
  {
  const response = await httpRequest(RELOADLY_AUTH_URL, RequestType.POST, RELOADLY_AUTH_HEADER_CONFIG, {
    client_id: process.env.RELOADLY_SANDBOX_CLIENT_ID,
    client_secret: process.env.RELOADLY_SANDBOX_CLIENT_SECRET,
    grant_type: 'client_credentials',
    audience: `https://topups-sandbox.reloadly.com`
  })

  // console.log(response, RELOADLY_AUTH_URL)

  existingAirtimeDataToken = response.access_token

  return response.access_token
}

else  if (type === "airtime-data" && existingAirtimeDataToken !== null) {
  return existingAirtimeDataToken
}

if (type === "bills-pay" && existingBillsToken == null)
  {
  const response = await httpRequest(RELOADLY_AUTH_URL, RequestType.POST, RELOADLY_AUTH_HEADER_CONFIG, {
    client_id: process.env.RELOADLY_SANDBOX_CLIENT_ID,
    client_secret: process.env.RELOADLY_SANDBOX_CLIENT_SECRET,
    grant_type: 'client_credentials',
    audience: "https://utilities-sandbox.reloadly.com"
  })

  // console.log(response, RELOADLY_AUTH_URL)

  existingBillsToken = response.access_token

  return response.access_token
}

else if (type === "bills-pay" && existingBillsToken !== null) {
  return existingBillsToken
}
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