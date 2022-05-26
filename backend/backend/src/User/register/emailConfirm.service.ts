import { Injectable } from '@nestjs/common';
import EmailService from './email.service';
 
@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly emailService: EmailService,
  ) {}
 
  //send email to user (otp for register)
  public sendVerificationLink(email: string,num:number) {
 
    // text to user (on email) //num = otp
    const text = `ยินดีต้อนรับเข้าสู่เว็บไซต์ MySL,รหัสยืนยันของท่านคือ ${num}`;
 
    return this.emailService.sendMail({
      to: email,
      subject: 'ยืนยันการสมัครเว็บไซต์ MySL',
      text,
    })
  }

  //send email to user (otp for change password)
  public sendConfirmPassword(email:string,num:number){
    // text to user (on email) //num = otp
    const text = `รหัสยืนยันของท่านคือ ${num} กรุณานำรหัสไปกรอกเพื่อยืนยันที่จะเปลี่ยนรหัสผ่าน `;

    return this.emailService.sendMail({
      to: email,
      subject: 'ยืนยันการเปลี่ยนรหัสผ่าน กรณีจำรหัสผ่านไม่ได้',
      text,
    })
  }
}