import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RoleModule } from 'src/role/role.module';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';


@Module({
  imports:[UserModule, RoleModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [AuthController],
  providers: [AuthService,EmailService,PrismaService],
})

export class AuthModule {}

