
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { default as config } from '../../config.json';

@Injectable({
  providedIn: 'root',
})
export class LightToggleService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('ROOT');
  public lightMessage$: BehaviorSubject<string> = new BehaviorSubject('OFF');
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

  public sendLightToggle(message: any) {
    this.socket.emit('light-toggle', message);
  }

  public getNewLightToggle = () => {
    this.socket.on('light-toggle', (message) =>{
      this.lightMessage$.next(message);
    });

    return this.lightMessage$.asObservable();
  };
}
