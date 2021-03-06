import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _auth: AuthService
  ) { }

  exit() {
    this._auth.exit();
  }

  isLogged() {
    return this._auth.isLogged();
  }
}
