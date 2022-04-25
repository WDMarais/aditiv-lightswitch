import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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
  messages;
  constructor(private http: HttpClient) {
    this.messages = this.http.get<any[]>(AppComponent.path);
  }

  post() {
    let user = { username: 'WDM', pw: 'letmein' };
    this.http.post(`${AppComponent.path}/users`, user).subscribe(next => console.log(next));
  }

  toggleLight() {
    this.isOn = !this.isOn;
  }
}
