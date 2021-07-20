import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from File Download Schema-First Federated Graphql Server at http://localhost:7002/graphql';
  }
}
