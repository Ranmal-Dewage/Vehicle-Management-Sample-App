import { Component, OnInit } from '@angular/core';
import { VehicleGqlService } from '../vehicles-services/vehicle-gql.service';
import { NotifierService } from "angular-notifier";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicles: Observable<any>;

  constructor(private vehicleGqlService: VehicleGqlService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleGqlService.getVehicles();
  }

  deleteVehicle(id: number): void {

    this.vehicleGqlService.deleteVehicle(id)
      .subscribe(
        (result: any) => {
          this.notifierService.notify("success", "Record with ID:" + id + " Deleted Successfully");
        },
        (error) => {
          this.notifierService.notify("error", "Deletion Error in Record with ID:" + id);
        }
      )

  }

}
