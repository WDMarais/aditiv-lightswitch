import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
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
  messages$;
  constructor(private http: HttpClient) {
    this.messages$ = this.http.get<any[]>(AppComponent.lightMessagePath);
  }

  post() {
    let user = { username: 'WDM', pw: 'letmein' };
    this.http.post(`${AppComponent.path}/users`, user).subscribe(next => console.log(next));
  }

  toggleLight() {
    this.isOn = !this.isOn;
    let message = this.http.get<any>(AppComponent.lightMessagePath);
    this.messages$ = this.messages$.pipe(map(data => {
      return [...data, message];
    }))
  }
}
