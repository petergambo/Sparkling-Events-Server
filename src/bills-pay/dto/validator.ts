/* eslint-disable prettier/prettier */

import * as Joi from 'joi'; // ✅ Correct way



export const billsPaySchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  amount: Joi.string().required(),
  variation_code: Joi.string().required(),
  billersCode: Joi.string().required(),
  subscription_type: Joi.string().required(),
  pin: Joi.string().required().min(4).max(4),
});


// export const airtimeSchema = Joi.object({
//   provider: Joi.string().valid('MTN', 'Airtel', 'Glo', '9mobile').required(),
// });