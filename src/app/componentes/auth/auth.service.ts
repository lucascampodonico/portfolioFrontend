import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

  signIn(email: string, password:string):Observable<any>{
    let data = {
      email: email,
      password: password
      };

    return this.http.post(API_URL+"auth/login", data)

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
