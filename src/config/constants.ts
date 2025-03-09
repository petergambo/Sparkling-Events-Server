/* eslint-disable prettier/prettier */
import { AxiosHeaders } from "axios";

/* eslint-disable prettier/prettier */
let AIRTIME_PROVIDER_URL: string, DATA_PROVIDER_URL: string, ELECTRICITY_PROVIDER_URL: string, VTPASS_HEADER_CONFIG: AxiosHeaders;
if (process.env.DEPLOYMENT == "DEVELOPMENT") {
    AIRTIME_PROVIDER_URL = "https://sandbox.vtpass.com";
    DATA_PROVIDER_URL = "https://sandbox.vtpass.com";
    ELECTRICITY_PROVIDER_URL = "https://sandbox.vtpass.com";
    VTPASS_HEADER_CONFIG = new AxiosHeaders( {
        "api-key": process.env.VTPASS_API_KEY,
        "public-key": process.env.VTPASS_PUBLIC_KEY,
        "secret-key": process.env.VTPASS_SECRET_KEY,
        "Content-Type": "application/json",
      });
}

if (process.env.DEPLOYMENT == "PRODUCTION") {
    AIRTIME_PROVIDER_URL = "https://vtpass.com";
    DATA_PROVIDER_URL = "https://vtpass.com";
    ELECTRICITY_PROVIDER_URL = "https://vtpass.com";
    VTPASS_HEADER_CONFIG = new AxiosHeaders( {
        "api-key": process.env.VTPASS_API_KEY,
        "public-key": process.env.VTPASS_PUBLIC_KEY,
        "secret-key": process.env.VTPASS_SECRET_KEY,
        "Content-Type": "application/json",
      });
}

export { AIRTIME_PROVIDER_URL as AIRTIME_PROVIDER, DATA_PROVIDER_URL as DATA_PROVIDER, ELECTRICITY_PROVIDER_URL as ELECTRICITY_PROVIDER, VTPASS_HEADER_CONFIG }