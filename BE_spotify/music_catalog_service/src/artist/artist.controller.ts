import { Controller } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @EventPattern("ADD_ARTISTS")
  async addArtist(@Payload() data){
    const { name, genre, image} = data;
    return await this.artistService.addArtist(name, genre, image);
  }

  @EventPattern("SEARCH_ARTISTS")
  async searchArtists(@Payload() data){
    return await this.artistService.findArtist(data.name);
  }

  @EventPattern("FIND_GENRE_ARTISTS")
  async findArtistsByGenre(@Payload() data){
    return await this.artistService.findArtistsByGenre(data.genre);
  }
}
