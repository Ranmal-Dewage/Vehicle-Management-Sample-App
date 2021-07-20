import { Module } from '@nestjs/common';
import { VehicleConnectionResolver } from './vehicle-connection.resolver';
import { VehicleConnectionService } from './vehicle-connection.service';

@Module({
  providers: [VehicleConnectionResolver, VehicleConnectionService]
})
export class VehicleConnectionModule {}
