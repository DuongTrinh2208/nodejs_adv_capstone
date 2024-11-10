import { Body, Controller, Get, Inject, Post, UseGuards, Headers } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api')
export class GatewayController {
  constructor(
    @Inject("USERS") private readonly userService: ClientProxy
  ) { }

  @Post('user-login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    let payload = {
      email,
      input_password: password
    };

    let data = await lastValueFrom(this.userService.send("LOGIN", payload));
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Headers() headers: any,
    @Body('current_password') currentPassword: string,
    @Body('new_password') newPassword: string
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.userService.send("CHANGE_PASSWORD", {
      token,
      input_current_password: currentPassword,
      new_password: newPassword
    }));
    return data;
  }
}
