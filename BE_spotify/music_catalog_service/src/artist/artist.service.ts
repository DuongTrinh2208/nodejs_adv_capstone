import { Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ArtistService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

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

        if(artist){
            const key = `${genre}_artists`;
            await this.cacheManager.del(key);
        }
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

    async findArtistsByGenre(genre){
        const key = `${genre}_artists`;
        let cachedData = await this.cacheManager.get(key);

        if(cachedData){
            return cachedData;
        }

        let data = await this.prismaService.artists.findMany({
            where: {
                genre
            }
        });

        if(data){
            this.cacheManager.set(key, data);
            return data;
        }

        return null;
    }
}
