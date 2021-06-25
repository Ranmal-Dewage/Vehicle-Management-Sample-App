import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { WebsocketService } from './websocket-services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Vehicle Management App';

  constructor(private websocketService: WebsocketService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.websocketService.listen("complete").subscribe((data) => {
      this.notifierService.notify("success", data)
    });
  }

}
