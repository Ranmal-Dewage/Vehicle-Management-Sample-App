import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FileDownloadProducer } from 'src/queue/file-download.producer';
import { FileDownloadResolver } from './file-download.resolver';

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
  providers: [FileDownloadResolver, FileDownloadProducer]
})
export class FileDownloadModule { }
