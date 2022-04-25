import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aditiv-lights';

  static path = 'http://localhost:4201';
  messages = this.http.get<any[]>(AppComponent.path);
  constructor(private http: HttpClient) {}

  post() {
    let user = { username: 'WDM', pw: 'letmein' };
    this.http.post(`${AppComponent.path}/users`, user).subscribe(next => console.log(next));
  }
}
