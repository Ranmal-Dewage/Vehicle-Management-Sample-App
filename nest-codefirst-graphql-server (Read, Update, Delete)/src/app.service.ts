import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello from Nest JS GraphQL Server on http://localhost:6000';
  }

}
