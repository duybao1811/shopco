import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpRepository } from './repository/otp.repo';
import { OtpSenderFactory } from './sender/otp-sender.factory';

@Injectable()
export class OtpService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly otpSenderFactory: OtpSenderFactory
  ) {}

  async generateAndSendOtp(recipient: string, channel: 'EMAIL' | 'SMS'): Promise<string> {
    const cooldown = 60 * 1000;
    const existingOtp = await this.otpRepository.findOtpByRecipient(recipient);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (existingOtp) {
      const timeSinceUpdate = Date.now() - existingOtp.updatedAt.getTime();
      if (timeSinceUpdate < cooldown) {
        throw new BadRequestException('Vui lòng đợi trước khi yêu cầu OTP mới');
      }

      await this.otpRepository.update(existingOtp.id, {
        otpCode,
        expiresAt,
        isUsed: false,
        updatedAt: new Date(),
      });
    } else {
      await this.otpRepository.createOtp(recipient, otpCode, expiresAt, channel);
    }

    const sender = this.otpSenderFactory.getSender(channel);
    await sender.send(recipient, otpCode);

    return otpCode;
  }

  async verifyOtp(email: string, otpCode: string): Promise<void> {
    const otp = await this.otpRepository.verifyOtp(email, otpCode);
    if (!otp) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn');
    }
    await this.otpRepository.markOtpUsed(otp.id)
  }
}
