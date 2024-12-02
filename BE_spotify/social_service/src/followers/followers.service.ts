import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class FollowersService {
    constructor(
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    private prismaService = new PrismaClient();

    async userFollowArtist(user_id, artist_id){
        let checkAlreadyFollower = await this.prismaService.followers.findFirst({
            where: {
                user_id,
                artist_id
            }
        });

        if(checkAlreadyFollower)
            return true;

        let data = await this.prismaService.followers.create({
            data: {
                user_id,
                artist_id
            }
        });

        if(data){
            const key = `artist_${artist_id}_followers`;
            await this.cacheManager.del(key); 
        }

        return data != null;
    }

    async userUnfollowArtist(user_id, artist_id){
        let checkAlreadyFollower = await this.prismaService.followers.findFirst({
            where: {
                user_id,
                artist_id
            }
        });

        if(!checkAlreadyFollower)
            return false;

        await this.prismaService.followers.delete({
            where: {
                user_id_artist_id: {
                    user_id,
                    artist_id
                }
            }
        });
    }

    async getArtistFollowersCount(artist_id){
        const key = `artist_${artist_id}_followers`;
        let cachedData = await this.cacheManager.get(key);

        if(cachedData){
            return cachedData;
        }

        let count = await this.prismaService.followers.count({
            where: {
                artist_id
            }
        });

        if(count){
            this.cacheManager.set(key, count);
            return count;
        }

        return null;
    }

    async decodeToken(token: string){
        try {
            const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }   
    }
}
