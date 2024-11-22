import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AlbumService } from './album.service';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @EventPattern("CREATE_ALBUM")
  async create(
    @Payload() data
  ) {
    const { artist_id, name, release_date } = data;
    await this.albumService.create(artist_id, name, release_date);
  }

  @EventPattern("FIND_ARTIST_ALBUM")
  async findArtistAlbum(
    @Payload() data
  ){
    const {artist_id} = data;
    return await this.albumService.findArtistAlbum(artist_id);
  }
}
