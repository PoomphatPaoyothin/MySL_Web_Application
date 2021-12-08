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
 
  public sendVerificationLink(email: string,num:number) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
    });
 
    const text = `ยินดีต้อนรับเข้าสู่เว็บไซต์ MySL,รหัสยืนยันของท่านคือ ${num}`;
 
    return this.emailService.sendMail({
      to: email,
      subject: 'ยืนยันการสมัครเว็บไซต์ MySL',
      text,
    })
  }

  public sendConfirmPassword(email:string,num:number){
    const payload: VerificationTokenPayload = { email };
    const text = `รหัสยืนยันของท่านคือ ${num} </br> กรุณานำรหัสไปกรอกเพื่อยืนยันที่จะเปลี่ยนรหัสผ่าน `;

    return this.emailService.sendMail({
      to: email,
      subject: 'ยืนยันการเปลี่ยนรหัสผ่าน กรณีจำรหัสผ่านไม่ได้',
      text,
    })
  }
}