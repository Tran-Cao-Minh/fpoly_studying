import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  handleLogin(data: any) {
    console.log(data, data.username, data.password);
    // this._auth.login(data.username, data.password).subscribe(() => {
    //   console.log('Login Success');
    //   this._router.navigateByUrl('/');
    // })
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
        console.log('oops', error);
        this._router.navigateByUrl('/login');
      },
    )
  } // handleLogin
}
