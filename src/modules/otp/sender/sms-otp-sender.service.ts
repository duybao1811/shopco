import { OtpSender } from './otp-sender.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsOtpSenderService implements OtpSender {
  async send(recipient: string, otpCode: string): Promise<void> {
    // Here you would implement the logic to send an SMS.
    // This is a placeholder implementation.
    console.log(`Sending OTP ${otpCode} to ${recipient} via SMS.`);
  }
}
