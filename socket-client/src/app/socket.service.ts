import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket; // member variable to hold the socket instance

  /**
   * @type {string}
   * @memberof SocketService
   * @description The URL of the server to connect to
   */
  url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url); // create a socket instance and connect to the server
  }

  /**
   * @description Listen to an event from the server
   * @param {string} eventName
   * @return {*}  {Observable<any>}
   * @memberof SocketService
   */
  listen(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  };

  /**
   * @description Emit an event to the server
   * @param {string} eventName
   * @param {*} data
   * @memberof SocketService
   */
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  };

  /**
   * @description Disconnect from the server
   * @memberof SocketService
   */
  disconnect() {
    this.socket.disconnect();
  };
}
