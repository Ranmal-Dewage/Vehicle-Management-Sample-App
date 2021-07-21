import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request, gql } from 'graphql-request';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { DateCalculation } from './shared/date-calculation';

@Injectable()
export class AppService {

  private postgraphileEndPoint: string = "http://localhost:5000/graphql";

  constructor(@InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>) { }

  getHello(): string {
    return 'Hello from Bull Consumer Server at http://localhost:3002';
  }

  async vehicleCreation(createVehicleData: CreateVehicleDto): Promise<Vehicle> {

    let ageOfVehicle: string = DateCalculation.getAgeOfVehicle(createVehicleData.manufacturedDate);
    let vehicleDetails = { ...createVehicleData, ageOfVehicle };
    const newVehicle: Vehicle = this.vehiclesRepository.create(vehicleDetails);
    return await this.vehiclesRepository.save(newVehicle);

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
