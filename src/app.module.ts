import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { OtpModule } from './modules/otp/otp.module';
import { OtpService } from './modules/otp/otp.service';
import { OtpController } from './modules/otp/otp.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.POSTGRES_LOCALISE.HOST,
      port: Number(config.POSTGRES_LOCALISE.PORT),
      username: config.POSTGRES_LOCALISE.USERNAME,
      password: config.POSTGRES_LOCALISE.PASSWORD,
      database: config.POSTGRES_LOCALISE.DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
    OtpModule,
  ],
  providers: [OtpService],
  controllers: [OtpController],
})
export class AppModule {}
