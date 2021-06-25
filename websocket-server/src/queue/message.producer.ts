import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MessageProducer {

    constructor(@InjectQueue('file-import') private queue: Queue) { }

    async sendImportData(clientId: string, data: number) {
        await this.queue.add('import-job', {
            clientId: clientId,
            data: data
        },{delay:10000})
    }

}