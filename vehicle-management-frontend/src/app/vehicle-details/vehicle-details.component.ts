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
  public searchText: string;
  public searchInit: boolean = false;

  constructor(private vehicleGqlService: VehicleGqlService, private notifierService: NotifierService) { }


  ngOnInit(): void {

    this.searchText = ''

    this.initQuery = this.vehicleGqlService.getVehicles(this.itemsPerPage, null, null, null, this.searchText);

    this.fetchMoreUsingCursor(this.itemsPerPage, null, null, null, this.searchText)

  }

  ngOnDestroy(): void {

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    this.vehicleGqlService.getApolloClient();

  }

  deleteVehicle(id: number): void {

    if (this.searchInit) {
      this.searchInit = false;
    }

    this.deleteSubscription = this.vehicleGqlService.deleteVehicle(id)
      .subscribe(
        (result: any) => {
          this.notifierService.notify("success", "Record with ID:" + id + " Deleted Successfully");
          this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null, this.searchText)
        },
        (error) => {
          this.notifierService.notify("error", "Deletion Error in Record with ID:" + id);
        }
      )

  }

  updateVehicleEvent(data: any): void {

    if (this.searchInit) {
      this.searchInit = false;
    };

    if (data.status) {
      this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null, this.searchText)
    }

  }

  paginationEvent(data: any): void {

    if (data.pageEvent === "next") {

      if (this.searchInit) {
        this.searchInit = false;
      }

      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer + 1;
      this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer] = data.after;

      this.fetchMoreUsingCursor(data.first, data.after, null, null, this.searchText)

    }
    else if (data.pageEvent === "previous") {

      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer - 1;

      this.fetchMoreUsingCursor(null, null, data.before, data.last, this.searchText);

    } else if (data.pageEvent === "deleteLastItemInPage") {

      this.edgeCursorTracker.pointer = this.edgeCursorTracker.pointer - 1;
      this.edgeCursorTracker.edgeCursorArray.pop();
      this.fetchMoreUsingCursor(this.itemsPerPage, this.edgeCursorTracker.edgeCursorArray[this.edgeCursorTracker.pointer], null, null, this.searchText);

    }

  }

  fetchMoreUsingCursor(first: number, after: string, before: string, last: number, search: string): void {

    this.initQuery.fetchMore({
      variables: {
        first: first,
        after: after,
        before: before,
        last: last,
        search: search
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.vehicles = fetchMoreResult.allVehicles.nodes.map((row: any) => {
          //calculate new age of vehicle when displaying
          return { ...row, ageOfVehicle: DateCalculation.getAgeOfVehicle(row.manufacturedDate) }
        });
        this.pageInfo = fetchMoreResult.allVehicles.pageInfo;
        this.totalCount = fetchMoreResult.allVehicles.totalCount;
      }
    });

  }

  searchEvent(data: any): void {

    this.edgeCursorTracker = {
      pointer: 0,
      edgeCursorArray: [null]
    };
    this.searchText = data.value
    this.searchInit = true;
    this.fetchMoreUsingCursor(this.itemsPerPage, null, null, null, this.searchText);
    
  }

}
