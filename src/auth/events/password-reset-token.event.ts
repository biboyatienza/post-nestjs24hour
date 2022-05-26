export class PasswordResetTokenEvent{
  constructor(public readonly email: string, public readonly passwordResetToken: string){}
}  