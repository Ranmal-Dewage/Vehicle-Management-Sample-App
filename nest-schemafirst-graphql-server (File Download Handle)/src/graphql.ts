
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class FileDownloadInput {
    data: number;
    channel: string;
}

export class FileDownload {
    status: boolean;
}

export abstract class IQuery {
    abstract fileDownloadFromAge(input: FileDownloadInput): FileDownload | Promise<FileDownload>;
}
