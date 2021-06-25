import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private uri: string = "ws://localhost:4000";
  private socket: io.Socket;

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<any> {

    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data)
      });
    });

  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

}
