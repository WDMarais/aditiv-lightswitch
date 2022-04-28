import { Component, ViewEncapsulation } from '@angular/core';
import { LightToggleService } from './light-toggle.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'aditiv-lights';
  isOn = false;
  static path = 'http://localhost:4201';
  static lightMessagePath = `${AppComponent.path}/light-message`;
  messageList: string[] = [];
  constructor(private lightToggleService: LightToggleService) {

  }

  ngOnInit(){
    this.lightToggleService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);
    })

    this.lightToggleService.getNewLightToggle().subscribe((message: string) => {
      console.log(message);
      this.isOn = message == "ON" ? true : false;
    });
  }

  sendRandomMessage() {
    const messages= ["Hello", "Hi", "Hola"];
    const index = Math.floor(Math.random() * messages.length);
    const message = messages[index];
    this.lightToggleService.sendMessage(message);
  }

  toggleLight() {
    let state = this.isOn ? "ON" : "OFF";
    let notState = this.isOn? "OFF": "ON";
    console.log(`Setting from ${state} to ${notState}`)
    this.lightToggleService.sendLightToggle(notState);
  }
}
