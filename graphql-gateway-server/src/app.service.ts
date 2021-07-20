import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Graphql Gateway Server at http://localhost:7000/graphql';
  }
}
