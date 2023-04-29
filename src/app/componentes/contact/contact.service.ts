import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private http: HttpClient) { }

  sendMail(body: any):Observable<any>{
    return this.http.post(API_URL+"send-email", body)
  }
}
