import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlbumService } from './album.service';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // @MessagePattern('createAlbum')
  // create(@Payload() data) {
  //   return this.albumService.create();
  // }

  // @MessagePattern('findAllAlbum')
  // findAll() {
  //   return this.albumService.findAll();
  // }

  // @MessagePattern('findOneAlbum')
  // findOne(@Payload() id: number) {
  //   return this.albumService.findOne(id);
  // }

  // @MessagePattern('updateAlbum')
  // update(@Payload() updateAlbumDto: UpdateAlbumDto) {
  //   return this.albumService.update(updateAlbumDto.id, updateAlbumDto);
  // }

  // @MessagePattern('removeAlbum')
  // remove(@Payload() id: number) {
  //   return this.albumService.remove(id);
  // }
}
