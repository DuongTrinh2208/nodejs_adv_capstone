import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LikesService {
    constructor(
        private jwtService: JwtService
    ){}

    private prismaService = new PrismaClient();

    async userLikeTrack(user_id, track_id){
        user_id = Number(user_id);
        track_id = Number(track_id);
        let checkValidTrack = await this.prismaService.tracks.findFirst({
            where: {
                track_id
            }
        });

        if(!checkValidTrack){
            throw new BadRequestException('Invalid Track');
        }

        let checkAlreadyLike = await this.prismaService.likes.findFirst({
            where: {
                track_id,
                user_id
            }
        });

        if(checkAlreadyLike){
            return;
        }

        let data = await this.prismaService.likes.create({
            data: {
                track_id,
                user_id,
                like_date_time: new Date()
            }
        });

        return data != null;
    }

    async userUnLikeTrack(user_id, track_id){
        user_id = Number(user_id);
        track_id = Number(track_id);
        let checkValidTrack = await this.prismaService.tracks.findFirst({
            where: {
                track_id
            }
        });

        if(!checkValidTrack){
            throw new BadRequestException('Invalid Track');
        }

        let checkAlreadyLike = await this.prismaService.likes.findFirst({
            where: {
                track_id,
                user_id
            }
        });

        if(!checkAlreadyLike){
            return;
        }

        let data = await this.prismaService.likes.delete({
            where: {
                user_id_track_id: {
                    user_id,
                    track_id
                }
            }
        });
        return data;
    }

    async getUserLikedTracks(user_id){
        return await this.prismaService.likes.findMany({
            where: {
                user_id
            },
            include: {
                tracks: true
            }
        })
    };

    async decodeToken(token: string){
        try {
            const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }   
    }
}
