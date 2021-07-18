import * as fs from 'fs';
import * as csv from 'csvtojson';
import { CreateVehicleDto } from 'src/dto/create-vehicle.dto';

export class CSVHandler {
    
    static async parseCSV(filePath: string): Promise<CreateVehicleDto[]> {

        const vehicles = await csv().fromFile(filePath);

        const createVehicleDtoArray = await this.convertToDBFormat(vehicles);
        fs.unlinkSync(filePath);

        return new Promise((resolve, reject) => {
            resolve(createVehicleDtoArray);
        });

    }

    private static convertToDBFormat(dataArray: any): Promise<CreateVehicleDto[]> {

        return new Promise((resolve, reject) => {
            resolve(
                dataArray.map((row: any) => {
                    return {
                        firstName: row.first_name,
                        lastName: row.last_name,
                        email: row.email,
                        carMake: row.car_make,
                        carModel: row.car_model,
                        vin: row.vin_number,
                        manufacturedDate: row.manufactured_date
                    }
                })
            );
        });

    }

}