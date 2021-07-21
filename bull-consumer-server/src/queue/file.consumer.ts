import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { AppService } from "src/app.service";
import { CreateVehicleDto } from "src/dto/create-vehicle.dto";
import { Vehicle } from "src/entities/vehicle.entity";
import { CSVHandler } from "src/shared/csv-handler";
import { XLSXHandler } from "src/shared/xlsx-handler";

@Processor('file-queue')
export class FileConsumer {

    constructor(private appService: AppService) { }

    @Process('file-job')
    async fileJob(job: Job<{ file: Express.Multer.File }>) {

        if (job.data.file.filename.split('.')[1] === 'xlsx') {
            const createVehicleDtoArray: CreateVehicleDto[] = await XLSXHandler.parseXLSX(job.data.file.path);
            const vehicles: Vehicle[] = await this.sendDataToServiceClass(createVehicleDtoArray);
            // console.log(vehicles)
        }
        else if (job.data.file.filename.split('.')[1] === 'csv') {
            const createVehicleDtoArray: CreateVehicleDto[] = await CSVHandler.parseCSV(job.data.file.path);
            const vehicles: Vehicle[] = await this.sendDataToServiceClass(createVehicleDtoArray);
            // console.log(vehicles)
        }

    }

    private sendDataToServiceClass(createVehicleDtoArray: CreateVehicleDto[]): Promise<Vehicle[]> {

        return new Promise((resolve, reject) => {

            Promise.all(
                createVehicleDtoArray.map(async (dto) => {
                    const vehicle: Vehicle = await this.appService.vehicleCreation(dto);
                    return vehicle;
                })
            ).then((data) => {
                resolve(data);
            })

            // **This way gives pending promises in long run calls. Therefore use above to avoid those situations**
            // ** Also if same thing happens to long running map and forEach use above way
            // resolve(
            //     createVehicleDtoArray.map(async (dto) => {
            //         const vehicle: Vehicle = await this.appService.vehicleCreation(dto);
            //         return vehicle;
            //     })
            // );

        });

    }

}