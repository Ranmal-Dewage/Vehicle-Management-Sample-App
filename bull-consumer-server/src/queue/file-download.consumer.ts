import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { AppService } from "src/app.service";
import { Vehicle } from "src/model/vehicle.model";
import * as socketClusterClient from "socketcluster-client"

@Processor('file-download')
export class FileDownloadConsumer {

    private socket: socketClusterClient.AGClientSocket;

    constructor(private appService: AppService) {
        this.socket = socketClusterClient.create({
            hostname: 'localhost',
            port: 8000
        });
    }

    @Process('file-download-job')
    public async fileDownloadJob(job: Job<{ payload: { data: number, channel: string } }>) {

        try {
            // let error = new Error('File Download Process Failed');
            // throw error;
            let filteredVehciles: Vehicle[] = await this.appService.getVehiclesByAge(job.data.payload.data)
            let csvRows = this.getCSVRowData(filteredVehciles);
            let socketData = {
                status: "success",
                name: "Vehicles with age greater than or equal to " + job.data.payload.data + " Years.csv",
                blob: csvRows,
                channel: job.data.payload.channel
            }
            let result = await this.socket.invoke('fileDownloadStatus', socketData);
            console.log(result)

        } catch (error) {
            let socketData = {
                status: "fail",
                errorName: error.message,
                channel: job.data.payload.channel
            }
            this.socket.transmit('errorEvent', socketData);
        }

    }

    private getCSVRowData(vehicles: Vehicle[]): string {
        const csvData = [];
        const headers = "id, first_name, last_name, email, car_make, car_model, vin_number, manufactured_date, age_of_vehcile";
        csvData.push(headers);
        for (const vehicle of vehicles) {
            csvData.push(vehicle.id + ',' + vehicle.firstName + ',' + vehicle.lastName + ',' + vehicle.email + ',' + vehicle.carMake
                + ',' + vehicle.carModel + ',' + vehicle.vin + ',' + vehicle.manufacturedDate + ',' + vehicle.ageOfVehicle);
        }
        return csvData.join("\n")
    }

}