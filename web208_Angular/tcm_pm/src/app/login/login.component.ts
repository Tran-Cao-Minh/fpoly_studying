

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFailedLogged: boolean = false;
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleLogin(data: any) {
    this._auth.login(data.username, data.password).subscribe(
      res => {
        const data = JSON.parse(res);
        console.log('Login Success', res);
        const expiresAt = moment().add(data.expiresIn, 'second');
        localStorage.setItem('id_token', data.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

        const previousPagePath = localStorage.getItem('previous_router');
        this._router.navigateByUrl(previousPagePath || '');
      },
      error => {
        this.isFailedLogged = true;
        console.log('login error', error);
      },
    )
  } // handleLogin
}

