import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehiclePatch } from '../dto/vehicle-patch.input';
import { Vehicle } from '../models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Resolver(of => Vehicle)
export class VehiclesResolver {
    constructor(private vehicleService: VehiclesService) { }

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
