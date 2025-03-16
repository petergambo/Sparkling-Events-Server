/* eslint-disable prettier/prettier */
import { AxiosHeaders } from "axios";

/* eslint-disable prettier/prettier */
let 
AIRTIME_PROVIDER_URL: string,
RELOADLY_AIRTIME_URL: string,
DATA_PROVIDER_URL: string, 
ELECTRICITY_PROVIDER_URL: string, 
VTPASS_HEADER_CONFIG: AxiosHeaders, 
RELOADLY_AUTH_URL: string,
RELOADLY_AUTH_HEADER_CONFIG: AxiosHeaders;


if (process.env.DEPLOYMENT == "DEVELOPMENT") {
  RELOADLY_AUTH_URL = "https://auth.reloadly.com/oauth/token";
    AIRTIME_PROVIDER_URL = "https://sandbox.vtpass.com";
    RELOADLY_AIRTIME_URL = "https://topups-sandbox.reloadly.com/topups";

    DATA_PROVIDER_URL = "https://sandbox.vtpass.com";
    ELECTRICITY_PROVIDER_URL = "https://sandbox.vtpass.com";

    VTPASS_HEADER_CONFIG = new AxiosHeaders( {
        "api-key": process.env.VTPASS_API_KEY,
        "public-key": process.env.VTPASS_PUBLIC_KEY,
        "secret-key": process.env.VTPASS_SECRET_KEY,
        "Content-Type": "application/json",
      });

      RELOADLY_AUTH_HEADER_CONFIG = new AxiosHeaders( {
        "Content-Type": "application/json",
      });
}

if (process.env.DEPLOYMENT == "PRODUCTION") {
  RELOADLY_AUTH_URL = "https://auth.reloadly.com/oauth/token";
    AIRTIME_PROVIDER_URL = "https://vtpass.com";
    RELOADLY_AIRTIME_URL = "https://topups.reloadly.com/topups";
    
    DATA_PROVIDER_URL = "https://vtpass.com";
    
    ELECTRICITY_PROVIDER_URL = "https://vtpass.com";
    
    VTPASS_HEADER_CONFIG = new AxiosHeaders( {
        "api-key": process.env.VTPASS_API_KEY,
        "public-key": process.env.VTPASS_PUBLIC_KEY,
        "secret-key": process.env.VTPASS_SECRET_KEY,
        "Content-Type": "application/json",
      });

      RELOADLY_AUTH_HEADER_CONFIG = new AxiosHeaders( {
        "Content-Type": "application/json",
      });
}

export { AIRTIME_PROVIDER_URL as AIRTIME_PROVIDER, RELOADLY_AIRTIME_URL, DATA_PROVIDER_URL as DATA_PROVIDER, ELECTRICITY_PROVIDER_URL as ELECTRICITY_PROVIDER, VTPASS_HEADER_CONFIG, RELOADLY_AUTH_URL, RELOADLY_AUTH_HEADER_CONFIG}