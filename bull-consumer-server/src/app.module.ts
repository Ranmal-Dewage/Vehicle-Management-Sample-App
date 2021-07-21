import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Vehicle } from './entities/vehicle.entity';
import { config } from './ormconfig';
import { FileDownloadConsumer } from './queue/file-download.consumer';
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
    BullModule.registerQueue(
      {
        name: 'file-download'
      },
      {
        name: 'file-queue'
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService, FileDownloadConsumer, FileConsumer],
})
export class AppModule { }
