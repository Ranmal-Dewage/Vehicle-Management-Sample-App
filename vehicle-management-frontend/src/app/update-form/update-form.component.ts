import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {

  updateForm: FormGroup;

  @Input('firstName') private initialFirstName: string;
  @Input('email') private initialEmail: string;
  @Input('frame') frame: any;

  ngOnInit() {
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.initialFirstName, Validators.required),
      email: new FormControl(this.initialEmail, [Validators.required, Validators.email])
    });
  }

  get subscriptionFormModalFirstName() {
    return this.updateForm.get('firstName');
  }

  get subscriptionFormModalEmail() {
    return this.updateForm.get('email');
  }

  updateData() {
    console.log(this.updateForm.value)
    this.frame.hide();
  }

}
