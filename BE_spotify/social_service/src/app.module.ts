import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FollowersModule } from './followers/followers.module';
import { RedisModule } from './redis/redis.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    FollowersModule,
    RedisModule,
    LikesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
