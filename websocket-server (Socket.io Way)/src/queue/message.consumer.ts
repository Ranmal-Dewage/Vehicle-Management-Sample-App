import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { AppService } from "src/app.service";
import { Socket } from 'socket.io';
import { Vehicle } from "src/entities/vehicle.entity";

@Processor('file-import')
export class MessageConsumer {

    public clientsArray: Socket[] = []

    constructor(private appService: AppService) { }

    @Process('import-job')
    async fileImportJob(job: Job<{ clientId: string, data: number }>) {

        let client: Socket = this.clientsArray.find((storedClient) => {
            return storedClient.id === job.data.clientId
        });

        try {
            let filteredVehicles: Vehicle[] = await this.appService.getVehcilesByAge(job.data.data);
            const csvRows = this.getCSVRowData(filteredVehicles);
            let fileData = {
                name: "Vehicles with age greater than or equal to " + job.data.data + " Years.csv",
                blob: csvRows
            }
            client.emit('complete', fileData)

        } catch (error) {
            client.emit('errorComplete', error.message)
        }

    }

    private getCSVRowData(vehicles: Vehicle[]) {
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