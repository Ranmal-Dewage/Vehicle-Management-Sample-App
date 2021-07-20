import { Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';
import { VehiclePatch } from '../dto/vehicle-patch.input';
import { Vehicle } from '../models/vehicle.model';

@Injectable()
export class VehiclesService {

    private postgraphileEndPoint: string = "http://localhost:5000/graphql";

    async updateVehicle(id: number, vehiclePatch: VehiclePatch): Promise<Vehicle> {

        const fetchedData = await this.updateVehicleQuery(id, vehiclePatch);

        const updatedVehicle = new Vehicle();

        updatedVehicle.id = fetchedData.updateVehicleById.vehicle.id;
        updatedVehicle.firstName = fetchedData.updateVehicleById.vehicle.firstName;
        updatedVehicle.lastName = fetchedData.updateVehicleById.vehicle.lastName;
        updatedVehicle.email = fetchedData.updateVehicleById.vehicle.email;
        updatedVehicle.carMake = fetchedData.updateVehicleById.vehicle.carMake;
        updatedVehicle.carModel = fetchedData.updateVehicleById.vehicle.carModel;
        updatedVehicle.vin = fetchedData.updateVehicleById.vehicle.vin;
        updatedVehicle.manufacturedDate = fetchedData.updateVehicleById.vehicle.manufacturedDate;
        updatedVehicle.ageOfVehicle = fetchedData.updateVehicleById.vehicle.ageOfVehicle;

        return updatedVehicle;

    }

    async deleteVehicle(id: number): Promise<Vehicle> {

        const fetchedData = await this.deleteVehicleQuery(id);

        const deletedVehicle = new Vehicle();

        deletedVehicle.id = fetchedData.deleteVehicleById.vehicle.id;
        deletedVehicle.firstName = fetchedData.deleteVehicleById.vehicle.firstName;
        deletedVehicle.lastName = fetchedData.deleteVehicleById.vehicle.lastName;
        deletedVehicle.email = fetchedData.deleteVehicleById.vehicle.email;
        deletedVehicle.carMake = fetchedData.deleteVehicleById.vehicle.carMake;
        deletedVehicle.carModel = fetchedData.deleteVehicleById.vehicle.carModel;
        deletedVehicle.vin = fetchedData.deleteVehicleById.vehicle.vin;
        deletedVehicle.manufacturedDate = fetchedData.deleteVehicleById.vehicle.manufacturedDate;
        deletedVehicle.ageOfVehicle = fetchedData.deleteVehicleById.vehicle.ageOfVehicle;

        return deletedVehicle;
    }

    private async deleteVehicleQuery(id: number): Promise<any> {

        const query = gql`
        mutation deleteVehicleById($id:Int!){
          deleteVehicleById(input:{id:$id}){
            vehicle{
              id
              firstName
              lastName
              email
              carMake
              carModel
              vin
              manufacturedDate
              ageOfVehicle
            }
          }
        }
        `;

        const variables = {
            id: id
        };

        const data = await request(this.postgraphileEndPoint, query, variables);
        return data;

    }

    private async updateVehicleQuery(id: number, vehiclePatch: VehiclePatch): Promise<any> {

        const query = gql`
        mutation updateVehicleById($id:Int!, $vehiclePatch:VehiclePatch!){
          updateVehicleById(input:{id:$id, vehiclePatch:$vehiclePatch}){
            vehicle{
              id
              firstName
              lastName
              email
              carMake
              carModel
              vin
              manufacturedDate
              ageOfVehicle
            }
          }
        }
        `;

        const variables = {
            id: id,
            vehiclePatch: vehiclePatch
        };

        const data = await request(this.postgraphileEndPoint, query, variables)
        return data;

    }

}
