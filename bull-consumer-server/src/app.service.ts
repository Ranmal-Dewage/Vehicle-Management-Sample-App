import { Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';
import { Vehicle } from './model/vehicle.model';

@Injectable()
export class AppService {

  private postgraphileEndPoint: string = "http://localhost:5000/graphql";

  getHello(): string {
    return 'Hello from Bull Consumer Server at http://localhost:3002';
  }

  public async getVehiclesByAge(age: number): Promise<Vehicle[]> {

    const vehicles: Vehicle[] = await this.fetchVehiclesQuery();

    let filteredVehciles: Vehicle[] = vehicles.filter((vehicle) => {
      if (parseInt(vehicle.ageOfVehicle.split(" ")[0]) >= age) {
        return vehicle;
      }
    });

    return filteredVehciles;

  }


  private async fetchVehiclesQuery(): Promise<Vehicle[]> {

    const query = gql`
    query allVehicles{
      allVehicles{
        nodes{
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

    const data = await request(this.postgraphileEndPoint, query);
    return data.allVehicles.nodes;

  }


}
