import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipient: string;

  @Column()
  otpCode: string;

  @Column({ type: 'enum', enum: ['EMAIL', 'SMS'] })
  channel: 'EMAIL' | 'SMS';

  @Column({ type: 'enum', enum: ['VERIFY_ACCOUNT', 'RESET_PASSWORD'] })
  type: 'VERIFY_ACCOUNT' | 'RESET_PASSWORD';

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
