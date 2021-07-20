import { Injectable } from '@angular/core';
// import * as io from "socket.io-client";
import * as socketClusterClient from "socketcluster-client"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private uri: string = "ws://localhost:4000";
  // private socket: io.Socket;
  private userNames: string[] = ["Ranmal Dewage", "Tenusha Guruge", "Vimukthi Rajapaksha", "Aravinda Kulasooriya"]
  private socket: socketClusterClient.AGClientSocket;
  public userName: string = this.userNames[Math.floor(Math.random() * this.userNames.length)];

  constructor() {
    // this.socket = io(this.uri);
    this.socket = socketClusterClient.create({
      hostname: 'localhost',
      port: 8000
    });
  }

  listen(channelName: string): Observable<any> {

    return new Observable((observer) => {
      // this.socket.on(eventName, (data: any) => {
      //   observer.next(data)
      // });

      (async () => {
        let channel = this.socket.subscribe(channelName);
        for await (let data of channel) {
          observer.next(data)
        }
      })();

    });

  }

  emit(eventName: string, data: any): void {
    // this.socket.emit(eventName, data);
  }

}
