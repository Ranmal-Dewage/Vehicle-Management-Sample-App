import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class AppService {

  constructor(@InjectRepository(Vehicle) private vehiclsRepository: Repository<Vehicle>) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getVehcilesByAge(age: number): Promise<Vehicle[]> {

    let allVehicles: Vehicle[] = await this.vehiclsRepository.find();
    let filteredVehicles: Vehicle[] = allVehicles.filter((vehicle) => {
      if (parseInt(vehicle.ageOfVehicle.split(" ")[0]) >= age) {
        return vehicle;
      }
    });
    return filteredVehicles;

  }

}
