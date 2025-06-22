import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from '../entity/otp.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async findOtpByRecipient(recipient: string): Promise<Otp | null> {
    return this.otpRepository.findOne({
      where: { recipient },
      order: { updatedAt: 'DESC' }
    });
  }

  async createOtp(recipient: string, otpCode: string, expiresAt: Date, channel: 'EMAIL' | 'SMS'): Promise<Otp> {
    const otp = this.otpRepository.create({
      recipient,
      otpCode,
      expiresAt,
      isUsed: false,
      channel
    });
    return this.otpRepository.save(otp);
  }

  async markOtpUsed(id: string) {
    return this.otpRepository.update(id, { isUsed: true });
  }

  async update(id: string, updateData: Partial<Otp>) {
    return this.otpRepository.update(id, updateData)
  }

  async deleteExpiredOtps() {
    await this.otpRepository.delete({ expiresAt: MoreThan(new Date()) });
  }

  async verifyOtp(recipient: string, otpCode: string): Promise<Otp | null> {
    const otp = await this.otpRepository.findOne({
      where: {
        recipient,
        otpCode,
        isUsed: false,
        expiresAt: MoreThan(new Date())
      }
    });
    return otp;
  }
}
