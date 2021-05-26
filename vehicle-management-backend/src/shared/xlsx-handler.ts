import { CreateVehicleDto } from 'src/dto/create-vehicle.dto';
import * as xlsx from 'xlsx';

export class XLSXHandler {

    static async parseXLSX(filePath: string): Promise<CreateVehicleDto[]> {

        const workbook = xlsx.readFile(filePath);

        let worksheets = await XLSXHandler.getWorksheetData(workbook);

        const createVehicleDtoArray = await XLSXHandler.convertToDBFormat(worksheets);

        return new Promise((reslove, reject) => {
            reslove(createVehicleDtoArray);
        })

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

    private static getWorksheetData(workbook: xlsx.WorkBook) {

        return new Promise((resolve, reject) => {

            workbook.SheetNames.forEach((sheet) => {
                resolve(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
            });

        });

    }

}