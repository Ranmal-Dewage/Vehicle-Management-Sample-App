import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DateCalculation } from '../../shared/date-calculation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehiclePatch } from '../models/vehicle-patch'

@Injectable({
  providedIn: 'root'
})
export class VehicleGqlService {

  private GET_VEHICLES = gql`
  {
    allVehicles{
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


  getVehicles(): Observable<any> {

    return this.apollo.watchQuery({ query: this.GET_VEHICLES })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.allVehicles.nodes.map((row: any) => {
            //calculate new age of vehicle when displaying
            return { ...row, ageOfVehicle: DateCalculation.getAgeOfVehicle(row.manufacturedDate) }
          });
        })
      );

  }

  deleteVehicle(id: number): Observable<any> {

    return this.apollo.mutate({
      mutation: this.DELETE_VEHICLE,
      refetchQueries: [{ query: this.GET_VEHICLES }],
      variables: {
        id: id
      }
    });

  }

  updateVehicle(id: number, vehiclePatch: VehiclePatch) {

    return this.apollo.mutate({
      mutation: this.UPDATE_VEHICLE,
      refetchQueries: [{ query: this.GET_VEHICLES }],
      variables: {
        id: id,
        vehiclePatch: vehiclePatch
      }
    });

  }

}
