import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { AppService } from "src/app.service";
import { CreateVehicleDto } from "src/dto/create-vehicle.dto";
import { Vehicle } from "src/entities/vehicle.entity";
import { XLSXHandler } from "src/shared/xlsx-handler";

@Processor('file-queue')
export class FileConsumer {

    constructor(private appService: AppService) { }

    @Process('file-job')
    async fileJob(job: Job<{ file: Express.Multer.File }>) {

        if (job.data.file.filename.split('.')[1] === 'xlsx') {
            const createVehicleDtoArray: CreateVehicleDto[] = await XLSXHandler.parseXLSX(job.data.file.path);
            const vehicles: Vehicle[] = await this.sendDataToServiceClass(createVehicleDtoArray);
            Promise.all(vehicles).then((data) => {
                console.log(data)
            })
        }

        // else if (job.data.file.filename.split('.')[1] === 'csv') {
        //     const dtoArray: CreateVehicleDto[] = await XLSXHandler.parseXLSX(job.data.file.path);
        //     this.sendDataToServiceClass(dtoArray);
        // }

    }

    private sendDataToServiceClass(createVehicleDtoArray: CreateVehicleDto[]): Promise<any> {

        return new Promise((resolve, reject) => {

            resolve(
                createVehicleDtoArray.map(async (dto) => {
                    const vehicle: Vehicle = await this.appService.vehicleCreation(dto);
                    return vehicle;
                })
            );

        });



    }

}