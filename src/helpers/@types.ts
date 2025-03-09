/* eslint-disable prettier/prettier */
import { AxiosHeaders } from "axios";

/* eslint-disable prettier/prettier */
enum RequestType {
    GET,
    POST
}

// Define custom header type extending AxiosHeaders
interface RequestHeader extends AxiosHeaders {
    "api-key": string;
    "public-key": string;
    "secret-key": string;
  }

export {RequestType, RequestHeader}