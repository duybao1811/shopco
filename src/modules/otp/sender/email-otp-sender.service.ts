import { Injectable } from '@nestjs/common';
import { OtpSender } from './otp-sender.interface';

@Injectable()
export class EmailOtpSenderService implements OtpSender {
  async send(recipient: string, otpCode: string): Promise<void> {
    // Here you would implement the logic to send an email.
    // This is a placeholder implementation.
    console.log(`Sending OTP ${otpCode} to ${recipient} via email.`);
  }
}
