import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleConnectionModule } from './vehicle-connection/vehicle-connection.module';

@Module({
  imports: [
    VehiclesModule,
    VehicleConnectionModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    VehicleConnectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
