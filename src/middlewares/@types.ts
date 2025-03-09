/* eslint-disable prettier/prettier */
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: JwtPayload | string; // Adjust type based on your JWT payload
}