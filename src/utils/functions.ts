/* eslint-disable prettier/prettier */
import * as nodemailer from 'nodemailer';
export const generate_otp = () => {
    const firstTwo = Math.floor(10 + Math.random() * 90).toString();
    const secondTwo = Math.floor(10 + Math.random() * 90).toString();
    const lastTwo = Math.floor(10 + Math.random() * 90).toString();

    const otp = firstTwo.toString() + secondTwo.toString() + lastTwo.toString();

    return otp
}

export function generateVTPassRequestId() {
    // Set timezone to Africa/Lagos (GMT +1)
    const now = new Date();
    const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  
    // Format the date to YYYYMMDD
    const year = lagosTime.getFullYear();
    const month = String(lagosTime.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(lagosTime.getDate()).padStart(2, '0');
    const hour = String(lagosTime.getHours()).padStart(2, '0');
    const minute = String(lagosTime.getMinutes()).padStart(2, '0');
  
    // Generate the base request ID
    const dateTimeString = `${year}${month}${day}${hour}${minute}`;
  
    // Generate a random alphanumeric extra string
    const extraString = Array.from({ length: 8 }, () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
  
    // Combine the dateTimeString and the extraString
    const requestId = `${dateTimeString}${extraString}`;
    return requestId;
  };


  export function generateAccountNumber(): string {
    const randomNumber = Math.floor(100000000000 + Math.random() * 900000000000); // Generates a 12-digit number
    return `ICM${randomNumber}`;
}

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: 'mail.myincome.com.ng',
    port: 465, // SMTP over SSL
    secure: true, // Use SSL/TLS
    auth: {
      user: 'noreply@myincome.com.ng',
      pass: 'Reloadly$21',
    },
  
  });
  


  await transporter.sendMail({
    from: `"ICM Lux Elite" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is: <b>${otp}</b>. It expires in 10 minutes.</p>`,
  });
}

export async function sendEmail(email: string, body: string, subject:string, emailSenderTitle: string) {
  const transporter = nodemailer.createTransport({
    host: 'mail.myincome.com.ng',
    port: 465, // SMTP over SSL
    secure: true, // Use SSL/TLS
    auth: {
      user: 'noreply@myincome.com.ng',
      pass: 'Reloadly$21',
    },
  
  });

  await transporter.sendMail({
    from: `"ICM ${emailSenderTitle}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: body,
  });
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
