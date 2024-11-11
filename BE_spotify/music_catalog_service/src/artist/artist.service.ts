import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArtistService {
    constructor(){}

    private prismaService = new PrismaClient();

    async addArtist(name, genre, image){
        const findArtist = await this.prismaService.artists.findFirst({
            where: {
                name
            }
        });

        if(findArtist){
            throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }

        const artist = await this.prismaService.artists.create({
            data: {
                name,
                genre,
                image
            }
        });

        return artist != null;
    }

    async findArtist(name) {
        const findArtists = await this.prismaService.artists.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });

        return findArtists;
    }
}
