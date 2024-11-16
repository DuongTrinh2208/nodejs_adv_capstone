import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(){}
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
    return await this.prismaService.albums.findMany({
      where: {
        artist_id
      }
    });
  }

  update() {
    return `This action updates a album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
