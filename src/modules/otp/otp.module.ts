import { Module } from '@nestjs/common';
import { Otp } from './entity/otp.entity';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { OtpRepository } from './repository/otp.repo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService, OtpRepository],
  exports: [OtpService]
})
export class OtpModule {}
