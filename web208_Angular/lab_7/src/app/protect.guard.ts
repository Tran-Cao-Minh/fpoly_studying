import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLogged() === false) {
      localStorage.setItem('previous_router', route.routeConfig?.path || '');
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    };
  }


}
