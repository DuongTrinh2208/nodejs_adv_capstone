import { Controller } from '@nestjs/common';
import { TrackService } from './track.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @EventPattern("ADD_TRACKS")
  async addTracks(@Payload() data){
    const {album_id, tracks, artist_id} = data;
    return await this.trackService.addTracks(album_id, tracks, artist_id);
  }

  @EventPattern("FIND_TRACKS_BY_NAME")
  async findTracksByName(@Payload() data){
    return await this.trackService.findTrack(data.name);
  }

  @EventPattern("FIND_TRACKS_IN_ALBUM")
  async findTracksInAlbum(@Payload() data){
    return await this.trackService.findTracksInAlbum(+data.album_id);
  }

  @EventPattern("FIND_TRACKS_BY_ARTIST")
  async findTracksByArtist(@Payload() data){
    return await this.trackService.findTracksByArtistID(+data.artist_id);
  }
}
