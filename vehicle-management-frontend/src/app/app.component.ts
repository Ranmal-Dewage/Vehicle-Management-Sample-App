import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { WebsocketService } from './websocket-services/websocket.service';
import * as FileSaver from 'file-saver-es'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Vehicle Management App';
  private completeSubscription: Subscription;
  public userName: string

  constructor(private websocketService: WebsocketService, private notifierService: NotifierService) {
    this.userName = this.websocketService.userName;
  }

  ngOnInit(): void {

    this.completeSubscription = this.websocketService.listen(this.userName).subscribe((data) => {

      if (data.status === "success") {
        this.notifierService.notify("success", "File is Ready. It will Start Downloading Shortly");
        let blob = new Blob([data.blob], { type: 'text/csv' });
        FileSaver.saveAs(blob, data.name);
      } else {
        this.notifierService.notify("error", data.errorName);
      }

    });

  }

  ngOnDestroy(): void {

    if (this.completeSubscription) {
      this.completeSubscription.unsubscribe();
    }

  }

}
