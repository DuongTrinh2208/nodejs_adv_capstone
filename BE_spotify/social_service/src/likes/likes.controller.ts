import { Controller } from '@nestjs/common';
import { LikesService } from './likes.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  
  @EventPattern("USER_LIKE_TRACK")
  async userLikeTrack(@Payload() data){
    let {track_id} = data;
    const tokenData = await this.likesService.decodeToken(data.token);

    return await this.likesService.userLikeTrack(tokenData.user_id, track_id);
  }

  @EventPattern("USER_UNLIKE_TRACK")
  async userUnLikeTrack(@Payload() data){
    let {track_id} = data;
    const tokenData = await this.likesService.decodeToken(data.token);

    return await this.likesService.userUnLikeTrack(tokenData.user_id, track_id);
  }

  @EventPattern("GET_USER_LIKED_TRACKS")
  async getUserLikedTracks(@Payload() data){
    const tokenData = await this.likesService.decodeToken(data.token);

    return await this.likesService.getUserLikedTracks(tokenData.user_id);
  }
}
