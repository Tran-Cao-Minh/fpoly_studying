import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  isFailedChangePass: boolean = false;
  constructor(
    private _auth: AuthService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
  }

  handleChangePass(data: any) {
    // this._auth.login(data.username, data.password).subscribe(() => {
    //   console.log('Login Success');
    //   this._router.navigateByUrl('/');
    // })
    this._auth.changePass(data.username, data.password, data.newPassword).subscribe(
      res => {
        const data = JSON.parse(res);
        console.log('Change Password Success', data);
        this._auth.exit();
        this._router.navigateByUrl('/login');
      },
      error => {
        console.log('oops', error);
        this.isFailedChangePass = true;
      },
    )
  } // changePass
}
