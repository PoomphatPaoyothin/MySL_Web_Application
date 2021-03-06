import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
 
@Module({
  imports: [ConfigModule,JwtModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}