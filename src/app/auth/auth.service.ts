import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }



  signIn(user:string, password: string){
    if(user === 'lucas' && password === '1234'){
      localStorage.setItem('token', 'prueba')
    } else  {
      localStorage.clear()
    }
  }

  verifyToken(){
    const token=localStorage.getItem('token')
    if(token === 'prueba') { return true } else {return false}
  }

}
