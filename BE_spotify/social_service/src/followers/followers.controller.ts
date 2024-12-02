import { Controller } from '@nestjs/common';
import { FollowersService } from './followers.service';

@Controller()
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}
}
