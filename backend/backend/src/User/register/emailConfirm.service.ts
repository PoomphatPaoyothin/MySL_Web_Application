import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import EmailService from './email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class EmailConfirmationService {
  constructor(
    @InjectRepository(User)
        private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}
 
  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
    });
 
    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
 
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
 
    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    })
  }
}