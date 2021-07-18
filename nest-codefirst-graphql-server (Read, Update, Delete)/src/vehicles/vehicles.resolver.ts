import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetVehicleInput } from './dto/get-vehicle.input';
import { VehiclePatch } from './dto/vehicle-patch.input';
import { VehicleConnection } from './models/vehicle-connection.model';
import { Vehicle } from './models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Resolver()
export class VehiclesResolver {
    constructor(private vehicleService: VehiclesService) { }

    @Query(returns => VehicleConnection)
    async allVehicles(@Args('getVehicleInput', { nullable: true }) getVehicleInput: GetVehicleInput): Promise<VehicleConnection> {

        const vehicleConnection = await this.vehicleService.getVehicles(getVehicleInput);
        return vehicleConnection;

    }

    @Mutation(returns => Vehicle)
    async updateVehicleById(@Args('id', { type: () => Int }) id: number, @Args('vehiclePatch') vehiclePatch: VehiclePatch): Promise<Vehicle> {

        const updatedVehicle = await this.vehicleService.updateVehicle(id, vehiclePatch);
        return updatedVehicle;
        
    }

    @Mutation(returns => Vehicle)
    async deleteVehicleById(@Args('id', { type: () => Int }) id: number): Promise<Vehicle> {

        const deletedVehicle = await this.vehicleService.deleteVehicle(id);
        return deletedVehicle;

    }

}
