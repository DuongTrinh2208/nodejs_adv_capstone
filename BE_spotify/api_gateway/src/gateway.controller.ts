import { Body, Controller, Get, Inject, Post, UseGuards, Headers, Query, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { last, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api')
export class GatewayController {
  constructor(
    @Inject("USERS") private readonly userService: ClientProxy,
    @Inject("MUSIC_CATALOGS") private readonly musicCatalogsService: ClientProxy,
    @Inject("PLAY_LIST") private readonly playlistService: ClientProxy
  ) { }

  @Post('user-login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    let payload = {
      email,
      input_password: password
    };

    let data = await lastValueFrom(this.userService.send("LOGIN", payload));
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Headers() headers: any,
    @Body('current_password') currentPassword: string,
    @Body('new_password') newPassword: string
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.userService.send("CHANGE_PASSWORD", {
      token,
      input_current_password: currentPassword,
      new_password: newPassword
    }));
    return data;
  }

  @Post('add-artist')
  async addArtist(
    @Body('name') name: string,
    @Body('genre') genre: string
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("ADD_ARTISTS", {
      name,
      genre,
      image: null
    }));

    return data;
  }

  @Get('search-artists')
  async searchArtists(
    @Query('name') name: string
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("SEARCH_ARTISTS", {
      name
    }));

    return data;
  }

  @Get('genre-artists')
  async findArtistsByGenre(
    @Query('genre') genre: string
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_GENRE_ARTISTS", {
      genre
    }));

    return data;
  }

  @Get('find-tracks-by-name')
  async findTracksByName(
    @Query('name') name: string
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_TRACKS_BY_NAME", {
      name
    }));

    return data;
  }

  @Get('find-tracks-in-album')
  async findTracksInAlbum(
    @Query('album_id') album_id: Number
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_TRACKS_IN_ALBUM", {
      album_id
    }));

    return data;
  }

  @Get('find-tracks-by-artist')
  async findTracksByArtist(
    @Query('artist_id') artist_id: Number
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_TRACKS_BY_ARTIST", {
      artist_id
    }));

    return data;
  }

  @Post('add-tracks')
  async addTrack(
    @Body('album_id') album_id: Number,
    @Body('artist_id') artist_id: Number,
    @Body('tracks') tracks: Array<any>
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("ADD_TRACKS", {
      album_id,
      artist_id,
      tracks
    }));

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get("get-user-playlist")
  async getUserPlaylists(
    @Headers() headers: any
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.playlistService.send("FIND_USER_PLAYLISTS", {
      token
    }));
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post("create-playlist")
  async createPlaylist(
    @Headers() headers: any,
    @Body('name') name: string
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.playlistService.send("CREATE_PLAYLIST", {
      token,
      name
    }));
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post("add-tracks-to-playlist")
  async addTracksToPlaylist(
    @Headers() headers: any,
    @Body('playlist_id') playlist_id: Number,
    @Body('trackIds') trackIds: Array<any>
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.playlistService.send("ADD_TRACKS_TO_PLAYLIST", {
      token,
      playlist_id,
      trackIds
    }));
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post("remove-tracks-from-playlist")
  async removeTracksFromPlaylist(
    @Headers() headers: any,
    @Body('playlist_id') playlist_id: Number,
    @Body('trackIds') trackIds: Array<any>
  ) {
    const token = headers.authorization;
    let data = await lastValueFrom(this.playlistService.send("REMOVE_TRACKS_FROM_PLAYLIST", {
      token,
      playlist_id,
      trackIds
    }));
    return data;
  }

  @Get("get-tracks-from-playlist")
  async getTracksInPlaylist(
    @Query('playlist_id') playlist_id: Number
  ) {
    let data = await lastValueFrom(this.playlistService.send("GET_TRACKS_IN_PLAYLIST", {
      playlist_id,
    }));
    return data;
  }

  @Post("create-album")
  async createAlbum(
    @Body('artist_id') artist_id: Number,
    @Body('name') name: string,
    @Body('release_date') release_date: string
  ) {
    const validDate = this.validateAndParseDate(release_date);
    if (!validDate.isValid) {
      throw new BadRequestException('Invalid release data format! please follow YYYY-MM-DD');
    }

    let data = await lastValueFrom(this.musicCatalogsService.send("CREATE_ALBUM", {
      artist_id,
      name,
      release_date
    }));

    return data;
  }

  @Get("find-artist-album")
  async findArtistAlbum(
    @Query('artist_id') artist_id: Number
  ) {
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_ARTIST_ALBUM", {
      artist_id
    }));

    return data;
  }

  validateAndParseDate(input) {
    // Regular expression to match the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the input matches the format
    if (!regex.test(input)) {
      return { isValid: false, message: "Invalid format. Use YYYY-MM-DD." };
    }

    // Parse the date to ensure it's a valid calendar date
    const date = new Date(input);

    // Validate that the parsed date matches the input string
    const [year, month, day] = input.split("-");
    if (
      date.getFullYear() !== parseInt(year, 10) ||
      date.getMonth() + 1 !== parseInt(month, 10) || // Months are 0-indexed
      date.getDate() !== parseInt(day, 10)
    ) {
      return { isValid: false, message: "Invalid date." };
    }

    return { isValid: true, date };
  }
}
