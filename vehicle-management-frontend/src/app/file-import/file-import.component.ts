import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket-services/websocket.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss'],
})
export class FileImportComponent implements OnInit, OnDestroy {

  private processSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private websocketService: WebsocketService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.processSubscription = this.websocketService.listen("processing").subscribe((data) => {
      this.notifierService.notify("success", data)
    });
    this.errorSubscription = this.websocketService.listen("errorProcessing").subscribe((data) => {
      this.notifierService.notify("error", data)
    });

  }

  ngOnDestroy(): void {
    if (this.processSubscription) {
      this.processSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  importData(form: NgForm) {
    let vehicleAge = parseInt(form.value.vehicleAge)
    form.resetForm()
    this.websocketService.emit('dataToServer', vehicleAge);
  }

}
