import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  result:any;
  token: any;

constructor(private http: HttpClient) { 
  this.token = localStorage.getItem('token')
}


  signIn(email: string, password:string):Observable<any>{
    let data = {
      email: email,
      password: password
      };

    return this.http.post(API_URL+"auth/login", data)

  }

  verifyTokens():Observable<boolean>{

        const headers = new HttpHeaders().set("Authorization", "Bearer "+ this.token)
        return this.http.get(API_URL+"user/verify", {headers: headers, observe: "response"})
        .pipe(
          map((res:any) => {return res.status === 200})
          )
      
    }

}
