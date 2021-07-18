import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from './ormconfig';
import { Vehicle } from './entities/vehicle.entity';
import { BullModule } from '@nestjs/bull'
import { FileProducer } from './queue/file.producer';
import { FileConsumer } from './queue/file.consumer';

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
      name: 'file-queue'
    })
  ],
  controllers: [AppController],
  providers: [AppService, FileProducer, FileConsumer],
})
export class AppModule { }
