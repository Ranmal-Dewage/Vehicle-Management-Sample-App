import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetVehicleInput } from 'src/dto/get-vehicle.input';
import { VehicleConnection } from 'src/models/vehicle-connection.model';
import { VehicleConnectionService } from './vehicle-connection.service';

@Resolver(of => VehicleConnection)
export class VehicleConnectionResolver {

    constructor(private vehicleConnectionService: VehicleConnectionService) { }

    @Query(returns => VehicleConnection)
    async allVehicles(@Args('getVehicleInput', { nullable: true }) getVehicleInput: GetVehicleInput): Promise<VehicleConnection> {

        const vehicleConnection = await this.vehicleConnectionService.getVehicles(getVehicleInput);
        return vehicleConnection;

    }
}
