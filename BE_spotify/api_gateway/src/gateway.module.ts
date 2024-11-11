import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Micro service modules
    ClientsModule.register([{
      name: "USERS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'users_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
    ClientsModule.register([{
      name: "MUSIC_CATALOGS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'music_catalog_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),  
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true
    }),

    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [GatewayController],
  providers: [JwtStrategy],
})
export class AppModule { }
