import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {Cache} from 'cache-manager';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){}
  private prismaService = new PrismaClient();

  async create(artist_id, name, release_date) {
    let data = await this.prismaService.albums.create({
      data: {
        artist_id,
        name,
        release_date
      }
    });
    return data;
  }

  async findArtistAlbum(artist_id) {
    // use Redis cache
    const artistAlbumKey = `${artist_id}_albums`;
    let cachedData = await this.cacheManager.get(artistAlbumKey);

    if(cachedData) {
      return cachedData;
    }

    let data = await this.prismaService.albums.findMany({
      where: {
        artist_id
      }
    });

    this.cacheManager.set(artistAlbumKey, data);
    return data;
  }
}
