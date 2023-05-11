import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';
import { BusinessCard } from './card.interface';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

private token = localStorage.getItem('token');
private headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

cardDeleted = new EventEmitter();
cardCreated = new EventEmitter();
cardUpdated = new EventEmitter();

private http = inject(HttpClient);


  uploadFile(formData: FormData):Observable<any>{
      return this.http.post(API_URL+"media/upload", formData, {headers: this.headers})
  }

  getCard(id: number):Observable<any>{
    return this.http.get(API_URL+"businessCard/"+id);
  }
  updateCard(id: number, businessCard:BusinessCard):Observable<any>{
    return this.http.put(API_URL+"businessCard/"+id, businessCard, {headers: this.headers});
  }
}
