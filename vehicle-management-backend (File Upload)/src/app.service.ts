import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello from File Producer Server at http://localhost:3000/';
  }

}
