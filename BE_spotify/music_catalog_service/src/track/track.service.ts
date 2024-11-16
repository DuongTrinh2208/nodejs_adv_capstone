import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TrackService {
    constructor() { }

    private prismaService = new PrismaClient();

    async addTracks(album_id, tracks, artist_id) {
        album_id = Number(album_id);
        artist_id = Number(artist_id);
        if(tracks.count <= 0){
            return false;
        }
        // Check if the album exists
        let findAlbum = await this.prismaService.albums.findFirst({
            where: {
                album_id,
                artist_id
            }
        });
    
        // Create a new album if it doesn't exist
        if (!findAlbum) {
            findAlbum = await this.prismaService.albums.create({
                data: {
                    artist_id,
                    name: 'New Album',
                    release_date: new Date()
                }
            });
    
            album_id = findAlbum.album_id;
        }
    
        // Prepare data for batch insertion
        const tracksData = tracks.map(track => ({
            album_id,
            name: track.name,
            duration: track.duration,
            path: track.path
        }));
    
        // Use createMany to insert multiple tracks at once
        const createdTracks = await this.prismaService.tracks.createMany({
            data: tracksData,
            skipDuplicates: true
        });
    
        return createdTracks.count > 0;
    }
    

    async findTrack(name) {
        const findTracks = await this.prismaService.tracks.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });

        return findTracks;
    }

    getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    async findTracksInAlbum(album_id) {
        album_id = Number(album_id);
        const tracksInAlbum = await this.prismaService.tracks.findMany({
            where: {
                album_id
            }
        });

        return tracksInAlbum;
    }

    async findTracksByArtistID(artist_id) {
        // use redis to store artist top tracks
        artist_id = Number(artist_id);
        const albumsWithTracks = await this.prismaService.albums.findMany({
            where: {
                artist_id
            },
            include: {
                tracks: true
            }
        });
    
        const tracks = albumsWithTracks.flatMap(album => album.tracks);
    
        return tracks;
    }
    
}
