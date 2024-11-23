import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AlbumService } from './album.service';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @EventPattern("CREATE_ALBUM")
  async create(
    @Payload() data
  ) {
    let { artist_id, name, release_date } = data;
    if(!artist_id){
      throw new BadRequestException('Missing artist id');
    }

    artist_id = Number(artist_id);
    name = name ? name : "New Album";
    release_date = release_date ? new Date(release_date) : new Date();
    return await this.albumService.create(artist_id, name, release_date);
  }

  @EventPattern("FIND_ARTIST_ALBUM")
  async findArtistAlbum(
    @Payload() data
  ){
    let {artist_id} = data;
    if(!artist_id){
      throw new BadRequestException('Missing artist id');
    }

    artist_id = Number(artist_id);
    return await this.albumService.findArtistAlbum(artist_id);
  }
}
