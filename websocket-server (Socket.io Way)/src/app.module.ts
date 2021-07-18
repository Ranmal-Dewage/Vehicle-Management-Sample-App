import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { BullModule } from '@nestjs/bull';
import { MessageProducer } from './queue/message.producer';
import { MessageConsumer } from './queue/message.consumer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Vehicle]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    BullModule.registerQueue({
      name: "file-import"
    })
  ],
  controllers: [],
  providers: [AppService, AppGateway, MessageProducer, MessageConsumer],
})
export class AppModule { }
