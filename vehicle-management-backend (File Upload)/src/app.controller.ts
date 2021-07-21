import { Controller, Get, Post, Body, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { FileHelper } from './shared/file-helper';
import * as fs from 'fs';
import { FileProducer } from './queue/file.producer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private fileProducer: FileProducer) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("file-upload")
  @UseInterceptors(FileInterceptor("userFile", {
    storage: diskStorage({
      destination: FileHelper.filePath,
      filename: FileHelper.customFileName
    })
  }))
  async createVehicle(@UploadedFile() file: Express.Multer.File) {

    try {

      if (file.filename.split('.')[1] === 'invalid') {
        fs.unlinkSync(file.path);
        throw { message: "Invalid File Format" };
      }

      await this.fileProducer.sendFile(file);
      return { "success": true };

    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }
}
