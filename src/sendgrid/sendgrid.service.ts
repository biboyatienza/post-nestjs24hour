import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as SendGrid from '@sendgrid/mail';
import { PasswordResetTokenEvent } from 'src/auth/events';

@Injectable()
export class SendgridService {
  constructor(){
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  async send(mail: SendGrid.MailDataRequired){
    const transport = await SendGrid.send(mail);

    console.log(`Email successfully dispatched to ${mail.to}`)
    return transport;    
  }

  @OnEvent('email.password.reset.token')
  async handleEmailPasswordResetToken(payload: PasswordResetTokenEvent){
    const mail = {
      to: payload.email,
      subject: 'Elrlich 24hr - Password Reset Token',
      from: 'biboyatienza@gmail.com',
      text: 'Your Password Reset Token: ' + payload.passwordResetToken,
      html: '<h3>Your Password Reset Token:</h3> ' + payload.passwordResetToken
    };

    console.log(`Sending email, Password reset token to ${mail.to}`);
    return await this.send(mail);
  }
}
