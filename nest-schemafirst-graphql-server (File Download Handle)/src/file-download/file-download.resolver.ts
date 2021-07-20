import { Args, Query, Resolver } from '@nestjs/graphql';
import { FileDownloadInput, FileDownload } from 'src/graphql';
import { FileDownloadProducer } from 'src/queue/file-download.producer';

@Resolver('FileDownload')
export class FileDownloadResolver {

    constructor(private fileDownloadProducer: FileDownloadProducer) { }

    @Query()
    async fileDownloadFromAge(@Args('input') input: FileDownloadInput): Promise<FileDownload> {

        try {
            // throw new Error("Request is Corrupted")
            await this.fileDownloadProducer.sendFileExtractionDetails(input);
            return { status: true }
        } catch (error) {
            // console.log(error.message)
            return { status: false }
        }

    }

}
