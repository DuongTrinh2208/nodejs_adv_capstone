import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @EventPattern("LOGIN")
  async loginUser(@Payload() data) {
    return await this.userService.login(data);
  }

  @EventPattern("CHANGE_PASSWORD")
  async changePassword(@Payload() data) {
    const tokenData = await this.userService.decodeToken(data.token);
    return await this.userService.changePassword(tokenData.user_id, data.input_current_password, data.new_password);
  }
}
