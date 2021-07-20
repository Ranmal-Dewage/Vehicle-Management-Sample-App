import { Injectable } from '@nestjs/common';
import { GetVehicleInput } from 'src/dto/get-vehicle.input';
import { VehicleConnection } from 'src/models/vehicle-connection.model';
import { request, gql } from 'graphql-request';

@Injectable()
export class VehicleConnectionService {

    private postgraphileEndPoint: string = "http://localhost:5000/graphql";

    async getVehicles(getVehicleInput: GetVehicleInput): Promise<VehicleConnection> {

        const { first, after, before, last, search } = getVehicleInput

        const vehicleConnection = new VehicleConnection();

        const fetchedData = await this.fetchVehiclesQuery(first, after, before, last, search);

        vehicleConnection.nodes = fetchedData.allVehicles.nodes;
        vehicleConnection.pageInfo = fetchedData.allVehicles.pageInfo;
        vehicleConnection.totalCount = fetchedData.allVehicles.totalCount;

        return vehicleConnection;

    }

    private async fetchVehiclesQuery(first: number, after: string, before: string, last: number, search: string): Promise<any> {

        const query = gql`
        query allVehicles($first:Int, $after:Cursor, $before:Cursor, $last:Int, $search:String){
          allVehicles(first:$first, after:$after, before:$before, last:$last, orderBy:MANUFACTURED_DATE_ASC, filter:{carMake:{startsWithInsensitive:$search}}){
            nodes{
              id
              firstName
              lastName
              email
              carMake
              carModel
              vin
              manufacturedDate
              ageOfVehicle
            }
            pageInfo{
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
            totalCount
          }
        }
        `;

        const variables = {
            first: first,
            after: after,
            last: last,
            before: before,
            search: search
        };

        const data = await request(this.postgraphileEndPoint, query, variables);
        return data;

    }


}
