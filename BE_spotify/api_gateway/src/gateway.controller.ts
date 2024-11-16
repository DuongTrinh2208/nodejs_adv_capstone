import { Body, Controller, Get, Inject, Post, UseGuards, Headers, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api')
export class GatewayController {
  constructor(
    @Inject("USERS") private readonly userService: ClientProxy,
    @Inject("MUSIC_CATALOGS") private readonly musicCatalogsService: ClientProxy
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

  @Get('find-tracks-by-name')
  async findTracksByName(
    @Query('name') name: string
  ){
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_TRACKS_BY_NAME", {
      name
    }));

    return data;
  }

  @Get('find-tracks-in-album')
  async findTracksInAlbum(
    @Query('album_id') album_id: Number
  ){
    let data = await lastValueFrom(this.musicCatalogsService.send("FIND_TRACKS_IN_ALBUM", {
      album_id
    }));

    return data;
  }

  @Get('find-tracks-by-artist')
  async findTracksByArtist(
    @Query('artist_id') artist_id: Number
  ){
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
  ){
    let data = await lastValueFrom(this.musicCatalogsService.send("ADD_TRACKS", {
      album_id,
      artist_id,
      tracks
    }));

    return data;
  }

}
