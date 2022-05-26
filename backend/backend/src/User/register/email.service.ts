import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

require('dotenv').config()

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;
    constructor(
      ) {
        this.nodemailerTransport = createTransport({
          host: 'smtp.gmail.com',
          secure: true,
          port: 465,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          }
        });
      }
     
      sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options);
      }
}
