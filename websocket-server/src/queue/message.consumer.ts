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
        let filteredVehicles: Vehicle[] = await this.appService.getVehcilesByAge(job.data.data);
        console.log(filteredVehicles);
        client.emit('complete', "You Send Value : " + job.data.data)
    }

}