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
  }

  sendRandomMessage() {
    const messages= ["Hello", "Hi", "Hola"];
    const index = Math.floor(Math.random() * messages.length);
    const message = messages[index];
    this.lightToggleService.sendMessage(message);
  }

  toggleLight() {
    this.isOn = !this.isOn;
  }
}
