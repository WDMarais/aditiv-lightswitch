
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { default as config } from '../../config.json';

@Injectable({
  providedIn: 'root',
})
export class LightToggleService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('ROOT');
  constructor() {}
  socket = io(`http://${config.socket_host}:${config.socket_port}`);

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}
