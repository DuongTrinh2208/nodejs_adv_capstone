import { HttpException, Injectable, UnauthorizedException, HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlaylistService {
  constructor(private jwtService: JwtService) { }
  prisma = new PrismaClient();

  async findAllUserPlaylists(user_id) {
    let data = await this.prisma.playlists.findMany({
      where: {
        user_id
      }
    });

    return data;
  }

  async createPlaylist(user_id, name) {
    let data = await this.prisma.playlists.create({
      data: {
        user_id,
        name
      }
    });

    return data != null;
  }

  async addTracksToPlaylist(user_id, playlist_id, trackIds) {
    let findPlaylist = await this.prisma.playlists.findFirst({
      where: {
        user_id,
        playlist_id
      }
    });

    if (!findPlaylist) {
      throw new UnauthorizedException('Invalid User');
    }

    if (trackIds.length <= 0) {
      return false;
    }

    let validTracks = [];
    let tracksCount = await this.getPlaylistTracksCount(playlist_id);

    for (let trackId of trackIds) {
      if (!this.checkTrackValid(trackId))
        continue;

      validTracks.push({
        playlist_id,
        track_id: trackId,
        Order: tracksCount
      });

      tracksCount++;
    }

    const addedTracks = await this.prisma.playlist_tracks.createMany({
      data: validTracks,
      skipDuplicates: true
    });

    return addedTracks.count > 0;
  }

  async removeTracksFromPlaylist(user_id, playlist_id, trackIds) {
    let findPlaylist = await this.prisma.playlists.findFirst({
      where: {
        user_id,
        playlist_id
      }
    });

    if (!findPlaylist) {
      throw new UnauthorizedException('Invalid User');
    }

    if (trackIds.length <= 0) {
      return false;
    }

    let validTrackIds = [];
    for (let trackId of trackIds) {
      if (!this.checkTrackInPlaylist(playlist_id, trackId))
        continue;
      validTrackIds.push(trackId);
    }

    let removeTracks = await this.prisma.playlist_tracks.deleteMany({
      where: {
        playlist_id,
        track_id: {
          in: validTrackIds
        }
      }
    });

    return removeTracks.count > 0;
  }

  async getTracksInPlaylist(playlist_id) {
    playlist_id = Number(playlist_id);
    let findPlaylist = await this.prisma.playlists.findFirst({
      where: {
        playlist_id
      }
    });

    if (!findPlaylist) {
      throw new NotFoundException('Not found playlist');
    }

    let tracksInPlaylist = await this.prisma.playlist_tracks.findMany({
      where: {
        playlist_id
      },
      include: {
        tracks: true
      }
    });

    return tracksInPlaylist;
  }

  async checkTrackInPlaylist(playlist_id, track_id) {
    const playlistTrack = await this.prisma.playlist_tracks.findFirst({
      where: {
        playlist_id,
        track_id
      }
    });

    return playlistTrack != null;
  }

  async checkTrackValid(track_id) {
    let track = await this.prisma.tracks.findFirst({
      where: {
        track_id
      }
    });

    return track != null;
  }

  async getPlaylistTracksCount(playlist_id) {
    let count = await this.prisma.playlist_tracks.count({
      where: {
        playlist_id
      }
    });

    return count + 1;
  }

  async decodeToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
      return decodedToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
