import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { DateCalculation } from './shared/date-calculation'

@Injectable()
export class AppService {
  constructor(@InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>) { }

  getHello(): string {
    return 'Hello from http://localhost:3000/';
  }

  async vehicleCreation(createVehicleData: CreateVehicleDto): Promise<Vehicle> {

    let ageOfVehicle: string = DateCalculation.getAgeOfVehicle(createVehicleData.manufacturedDate);
    let vehicleDetails = { ...createVehicleData, ageOfVehicle };
    const newVehicle: Vehicle = this.vehiclesRepository.create(vehicleDetails);
    return await this.vehiclesRepository.save(newVehicle);

  }

}
