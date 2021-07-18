import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducer {

    constructor(@InjectQueue('file-queue') private queue: Queue) { }

    async sendFile(file: Express.Multer.File) {
        await this.queue.add('file-job', {
            file: file
        });
    }

}