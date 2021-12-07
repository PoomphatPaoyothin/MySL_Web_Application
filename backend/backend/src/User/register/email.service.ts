import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;
    constructor(
      ) {
        this.nodemailerTransport = createTransport({
          service: "gmail",
          auth: {
            user: "myslapplication@gmail.com",
            pass: "mysl1234",
          }
        });
      }
     
      sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options);
      }
}
