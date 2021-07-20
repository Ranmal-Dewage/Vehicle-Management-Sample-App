import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileDownloadConsumer } from './queue/file-download.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    BullModule.registerQueue({
      name: 'file-download'
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FileDownloadConsumer],
})
export class AppModule { }
