import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private  readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email || '', phone: user.phone || '' };
    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
    };
  }

  async register(dto:  RegisterDto) {
    const { email, password, phone, lastName, firstName } = dto;
    const userEmail = await this.usersService.findByEmail(email);

    if (userEmail) {
      throw new BadRequestException('User with this email already exists');
    }

    const userPhone = await this.usersService.findByPhoneNumber(phone);
    if (userPhone) {
      throw new BadRequestException('User with this phone already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.createUser({
      email,
      password: hashedPassword,
      phone,
      lastName,
      firstName,
    })

    if (email) {
      await this.otpService.generateAndSendOtp(email, 'EMAIL')
    } else if (phone) {
      await this.otpService.generateAndSendOtp(phone, 'SMS')
    }
  }

  async forgotPassword() {}

  async sendOtp() {}

  async verifyOtp() {}

  async resetPassword() {}
}
