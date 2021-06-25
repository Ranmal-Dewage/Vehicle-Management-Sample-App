import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private uri: string = "http://localhost:4000";
  private socket: io.Socket;

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<any> {

    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data)
      });
    });

  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

}
