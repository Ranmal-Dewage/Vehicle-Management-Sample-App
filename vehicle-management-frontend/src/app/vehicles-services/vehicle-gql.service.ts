import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { VehiclePatch } from '../models/vehicle-patch'

@Injectable({
  providedIn: 'root'
})
export class VehicleGqlService {

  private GET_VEHICLES = gql`
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

  private DELETE_VEHICLE = gql`
  mutation deleteVehicleById($id:Int!){
    deleteVehicleById(input:{id:$id}){
      vehicle{
        id
      }
    }
  }
  `;

  private UPDATE_VEHICLE = gql`
  mutation updateVehicleById($id:Int!, $vehiclePatch:VehiclePatch!){
    updateVehicleById(input:{id:$id, vehiclePatch:$vehiclePatch}){
      vehicle{
        id
      }
    }
  }
  `;

  constructor(private apollo: Apollo) { }


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
