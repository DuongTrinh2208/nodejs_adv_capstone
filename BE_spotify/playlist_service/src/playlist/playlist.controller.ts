import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PlaylistService } from './playlist.service';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @EventPattern("FIND_USER_PLAYLISTS")
  async findUserPlaylists(@Payload() data) {
    const tokenData = await this.playlistService.decodeToken(data.token);
    return await this.playlistService.findAllUserPlaylists(tokenData.user_id);
  }

  @EventPattern("CREATE_PLAYLIST")
  async createPlaylist(@Payload() data) {
    console.log(data);
    const { name } = data;
    const tokenData = await this.playlistService.decodeToken(data.token);
    return await this.playlistService.createPlaylist(tokenData.user_id, name);
  }

  @EventPattern("ADD_TRACKS_TO_PLAYLIST")
  async addTracksToPlaylist(@Payload() data) {
    const { playlist_id, trackIds } = data;
    const tokenData = await this.playlistService.decodeToken(data.token);
    return await this.playlistService.addTracksToPlaylist(tokenData.user_id, playlist_id, trackIds);
  }

  @EventPattern("REMOVE_TRACKS_FROM_PLAYLIST")
  async removeTracksFromPlaylist(@Payload() data) {
    const { playlist_id, trackIds } = data;
    const tokenData = await this.playlistService.decodeToken(data.token);
    return await this.playlistService.removeTracksFromPlaylist(tokenData.user_id, playlist_id, trackIds);
  }

  @EventPattern("GET_TRACKS_IN_PLAYLIST")
  async getTracksInPlaylist(@Payload() data) {
    const { playlist_id } = data;
    return await this.playlistService.getTracksInPlaylist(playlist_id);
  }
}
