export interface OtpSender {
  send(recipient: string, otpCode: string): Promise<void>;
}
