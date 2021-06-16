import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleGqlService } from '../vehicles-services/vehicle-gql.service';
import { NotifierService } from "angular-notifier";
import { Subscription } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { QueryRef } from 'apollo-angular';
import { DateCalculation } from '../../shared/date-calculation';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {

  public vehicles: Vehicle[];
  public pageInfo: any;
  public totalCount: number;
  public edgeCursorTracker: { pointer: number, edgeCursorArray: string[] } = {
    pointer: 0,
    edgeCursorArray: [null]
  };
  public deleteSubscription: Subscription;
  public initQuery: QueryRef<any>;
  private itemsPerPage: number = 5;

  constructor(private vehicleGqlService: VehicleGqlService, private notifierService: NotifierService) { }


  ngOnInit(): void {
    console.log('Parent Init.....')

    this.initQuery = this.vehicleGqlService.getVehicles(this.itemsPerPage, null, null, null);

    this.fetchMoreUsingCursor(this.itemsPerPage, null, null, null)
    console.log("Hit init.....");

  }

  ngOnDestroy(): void {
    console.log('Parent Destroy.....')
    if (this.deleteSubscription) {
      console.log('Parent Destroy delete.....')
      this.deleteSubscription.unsubscribe();
    }
    this.vehicleGqlService.getApolloClient();
  }

  deleteVehicle(id: number): void {
    console.log(this.edgeCursorTracker);

    this.deleteSubscription = this.vehicleGqlService.deleteVehicle(id)
      .subscribe(
        (result: any) => {
          this.notifierService.notify("success", "Record with ID:" + id + " Deleted Successfully");
          this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null)
        },
        (error) => {
          this.notifierService.notify("error", "Deletion Error in Record with ID:" + id);
        }
      )

  }

  updateVehicleEvent(data: any): void {

    if (data.status) {
      this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null)
    }
    
  }

  paginationEvent(data: any): void {

    if (data.pageEvent === "next") {

      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer + 1;
      this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer] = data.after;

      console.log(this.edgeCursorTracker);
      console.log(data);
      this.fetchMoreUsingCursor(data.first, data.after, null, null)

    }
    else if (data.pageEvent === "previous") {

      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer - 1;

      console.log(this.edgeCursorTracker);
      console.log(data);
      this.fetchMoreUsingCursor(null, null, data.before, data.last);

    } else if (data.pageEvent === "deleteLastItemInPage") {
      console.log("HAHAHAHAH");
      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer - 1;
      this.edgeCursorTracker.edgeCursorArray.pop();
      this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null);
      console.log(this.edgeCursorTracker);
    }

  }

  fetchMoreUsingCursor(first: number, after: string, before: string, last: number): void {

    this.initQuery.fetchMore({
      variables: {
        first: first,
        after: after,
        before: before,
        last: last
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(prev)
        console.log(fetchMoreResult)
        this.vehicles = fetchMoreResult.allVehicles.nodes.map((row: any) => {
          //calculate new age of vehicle when displaying
          return { ...row, ageOfVehicle: DateCalculation.getAgeOfVehicle(row.manufacturedDate) }
        });
        this.pageInfo = fetchMoreResult.allVehicles.pageInfo;
        this.totalCount = fetchMoreResult.allVehicles.totalCount;
      }
    });

  }

}
