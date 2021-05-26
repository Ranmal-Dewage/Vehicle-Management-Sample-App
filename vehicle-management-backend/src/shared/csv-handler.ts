import * as fs from 'fs';
import * as csv from 'csvtojson';

export class CSVHandler {
    static async paerseCSV(filePath: string) {

        const vehicles = await csv().fromFile(filePath);
        console.log(vehicles)

    }
}