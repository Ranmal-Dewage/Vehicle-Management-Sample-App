import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { WebsocketService } from './websocket-services/websocket.service';
import * as FileSaver from 'file-saver'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Vehicle Management App';
  private completeSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private websocketService: WebsocketService, private notifierService: NotifierService) { }

  ngOnInit(): void {

    this.completeSubscription = this.websocketService.listen("complete").subscribe((data) => {
      this.notifierService.notify("success", "File is Ready. It will Start Downloading Shortly")
      let blob = new Blob([data.blob], { type: 'text/csv' });
      FileSaver.saveAs(blob, data.name);
    });

    this.errorSubscription = this.websocketService.listen("errorComplete").subscribe((data) => {
      this.notifierService.notify("error", data)
    });

  }

  ngOnDestroy(): void {
    if (this.completeSubscription) {
      this.completeSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

}
