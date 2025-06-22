import { Injectable } from '@nestjs/common';
import { EmailOtpSenderService } from './email-otp-sender.service';
import { SmsOtpSenderService } from './sms-otp-sender.service';
import { OtpSender } from './otp-sender.interface';

@Injectable()
export class OtpSenderFactory {
  constructor(
    private readonly emailSender: EmailOtpSenderService,
    private readonly smsSender: SmsOtpSenderService
  ) {}

  getSender(channel: 'EMAIL' | 'SMS'): OtpSender {
    switch (channel) {
      case 'EMAIL':
        return this.emailSender;
      case 'SMS':
        return this.smsSender;
      default:
        throw new Error(`Unsupported OTP channel: ${channel}`);
    }
  }
}
