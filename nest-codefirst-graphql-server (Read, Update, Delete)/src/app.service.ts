import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello from Vehicle Detail Read, Update, Delete Code-First Federated GraphQL Server on http://localhost:7001/graphql';
  }

}
