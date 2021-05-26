import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export class FileHelper {

    static customFileName(req, file, cb) {

        let customFile: string = file.originalname.split('.')[0];
        customFile = customFile + "_" + Date.now() + '_' + Math.round(Math.random() * 1e9);

        let fileExtension: string;
        if (file.mimetype === 'application/vnd.ms-excel') {
            fileExtension = '.csv';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fileExtension = '.xlsx';
        } else {
            fileExtension = '.invalid';
        }

        customFile = customFile + fileExtension;
        cb(null, customFile);

    }

    static filePath(req, file, cb) {

        cb(null, path.join(__dirname, '../../uploads'));

    }

}