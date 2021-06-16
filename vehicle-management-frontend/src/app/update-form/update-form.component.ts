import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { VehicleGqlService } from '../vehicles-services/vehicle-gql.service';
import { NotifierService } from "angular-notifier";
import { Vehicle } from '../models/vehicle';
import { VehiclePatch } from '../models/vehicle-patch';
import { DateCalculation } from '../../shared/date-calculation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit, OnDestroy {

  public updateForm: FormGroup;
  public updateSubscription: Subscription;

  constructor(private vehicleGqlService: VehicleGqlService, private notifierService: NotifierService) { }

  @Input('frame') frame: any;
  @Input('vehicle') vehicle: Vehicle;
  @Output('parentUpdate') parentUpdate: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    console.log('Update Modal Init......')
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.vehicle.firstName, Validators.required),
      lastName: new FormControl(this.vehicle.lastName, Validators.required),
      email: new FormControl(this.vehicle.email, [Validators.required, Validators.email]),
      carMake: new FormControl(this.vehicle.carMake, Validators.required),
      carModel: new FormControl(this.vehicle.carModel, Validators.required),
      vin: new FormControl(this.vehicle.vin, Validators.required),
      manufacturedDate: new FormControl(this.vehicle.manufacturedDate, Validators.required),
    });
  }

  ngOnDestroy(): void {
    console.log('Update Modal Destroy......')
    if (this.updateSubscription) {
      console.log('Update Modal Destroy updateSub......')
      this.updateSubscription.unsubscribe();
    }
  }

  get getFirstName() {
    return this.updateForm.get('firstName');
  }

  get getLastName() {
    return this.updateForm.get('lastName');
  }

  get getEmail() {
    return this.updateForm.get('email');
  }

  get getCarMake() {
    return this.updateForm.get('carMake');
  }

  get getCarModel() {
    return this.updateForm.get('carModel');
  }

  get getVin() {
    return this.updateForm.get('vin');
  }

  get getManufacturedDate() {
    return this.updateForm.get('manufacturedDate');
  }

  updateData() {

    let id: number = this.vehicle.id
    let vehiclePatch: VehiclePatch = {
      ...this.updateForm.value,
      ageOfVehicle: DateCalculation.getAgeOfVehicle(this.updateForm.get('manufacturedDate').value)
    };
    this.updateSubscription = this.vehicleGqlService.updateVehicle(id, vehiclePatch)
      .subscribe(
        (result) => {
          this.notifierService.notify("success", "Record with ID:" + id + " Updated Successfully");
          this.frame.hide();
          this.parentUpdate.emit({ status: true })
        },
        (error) => {
          this.notifierService.notify("error", "Updating Error in Record with ID:" + id);
        }
      );

  }

}
