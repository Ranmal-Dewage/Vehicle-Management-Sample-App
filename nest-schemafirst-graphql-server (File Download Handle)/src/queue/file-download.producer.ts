import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileDownloadProducer {

    constructor(@InjectQueue('file-download') private queue: Queue) { }

    async sendFileExtractionDetails(payload: { data: number, channel: string }) {

        await this.queue.add('file-download-job', {
            payload: payload
        }, { delay: 10000 });

    }

}

