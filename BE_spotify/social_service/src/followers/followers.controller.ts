import { Controller } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @EventPattern("USER_FOLLOW_ARTIST")
  async userFollowArtist(@Payload() data){
    let {artist_id} = data;
    const tokenData = await this.followersService.decodeToken(data.token);
    return await this.followersService.userFollowArtist(tokenData.user_id, artist_id);
  }

  @EventPattern("USER_UNFOLLOW_ARTIST")
  async userUnFollowArtist(@Payload() data){
    let {artist_id} = data;
    const tokenData = await this.followersService.decodeToken(data.token);
    return await this.followersService.userUnfollowArtist(tokenData.user_id, artist_id);
  }

  @EventPattern("GET_ARTISTS_FOLLOWER_COUNT")
  async getArtistFollowerCount(@Payload() data){
    let {artist_id} = data;
    return await this.followersService.getArtistFollowersCount(artist_id);
  }
}
