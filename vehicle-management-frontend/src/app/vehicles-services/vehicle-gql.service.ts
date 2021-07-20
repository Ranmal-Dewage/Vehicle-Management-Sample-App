import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { VehiclePatch } from '../models/vehicle-patch'
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class VehicleGqlService {

  private GET_VEHICLES = gql`
  query allVehicles($first:Int, $after:String, $before:String, $last:Int, $search:String){
    allVehicles(getVehicleInput:{first:$first, after:$after, before:$before, last:$last, search:$search}){
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

  private DELETE_VEHICLE = gql`
  mutation deleteVehicleById($id:Int!){
    deleteVehicleById(id:$id){
        id
    }
  }
  `;

  private UPDATE_VEHICLE = gql`
  mutation updateVehicleById($id:Int!, $vehiclePatch:VehiclePatch!){
    updateVehicleById(id:$id, vehiclePatch:$vehiclePatch){
        id
    }
  }
  `;

  private FILE_DOWNLOAD = gql`
  query fileDownloadFromAge($age:Int!, $channel:String!){
    fileDownloadFromAge(input:{data:$age,channel:$channel}){
      status
  }
  }
  `;

  constructor(private apollo: Apollo) { }

  triggerFileDownload(age: number, channel: string) {

    return this.apollo.watchQuery({
      query: this.FILE_DOWNLOAD,
      variables: {
        age: age,
        channel: channel
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map((result: any) => {
        return result.data.fileDownloadFromAge.status
      })
    );

  }


  getVehicles(first: number, after: string, before: string, last: number, search: string): QueryRef<any> {

    return this.apollo.watchQuery({
      query: this.GET_VEHICLES,
      // pollInterval: 500,
      variables: {
        first: first,
        after: after,
        before: before,
        last: last,
        search: search
      },
      fetchPolicy: 'network-only'
    })
  }

  deleteVehicle(id: number): Observable<any> {

    return this.apollo.mutate({
      mutation: this.DELETE_VEHICLE,
      variables: {
        id: id
      }
    });

  }

  updateVehicle(id: number, vehiclePatch: VehiclePatch): Observable<any> {

    return this.apollo.mutate({
      mutation: this.UPDATE_VEHICLE,
      variables: {
        id: id,
        vehiclePatch: vehiclePatch
      }
    });

  }

  getApolloClient(): Promise<any[]> {
    return this.apollo.client.clearStore()
  }

}
