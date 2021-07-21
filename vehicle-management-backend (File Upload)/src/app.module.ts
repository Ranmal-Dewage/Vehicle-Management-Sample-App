import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull'
import { FileProducer } from './queue/file.producer';

@Module({
  imports: [
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
  providers: [AppService, FileProducer],
})
export class AppModule { }
