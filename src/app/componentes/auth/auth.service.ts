import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

  signIn(email: string, password:string){

    const token = { token: "asdasdasd" };

    return token

  }

    verifyToken(){

      const token = localStorage.getItem('token')
      if(token != undefined && token != ''){
        return true
      } else {
        return false
      }

    }
}
