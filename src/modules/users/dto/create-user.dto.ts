import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsEmailOrPhone', async: false })
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface {
  validate(_: any, args) {
    const obj = args.object as any;
    return !!(obj.email || obj.phone);
  }

  defaultMessage() {
    return 'At least email or phone must be provided';
  }
}

@ValidatorConstraint({ name: 'IsEmailOrPhone', async: false })
export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
