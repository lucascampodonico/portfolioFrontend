import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){}

  canActivate(): Observable<boolean> | boolean {
    if(!this._authService.verifyToken()) this._router.navigateByUrl('login')
    return this._authService.verifyToken()
  }
  
}
