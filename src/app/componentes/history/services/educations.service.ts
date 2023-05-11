import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  // educations = [
  //   {
  //     id: 1,
  //     name: 'UNER',
  //     dateOf: '2010-10-11',
  //     dateTo: '2015-01-12',
  //     description: 'Licensed in Systems'
  //   },
  //   {
  //     id: 2,
  //     name: 'Udemy',
  //     dateOf: '2021-05-11',
  //     dateTo: '2023-01-12',
  //     description: 'Multiple Courses'
  //   }
  // ];

  private http = inject(HttpClient);
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

  educationDeleted = new EventEmitter();
  educationCreated = new EventEmitter();
  educationUpdated = new EventEmitter();

    getAllEducations():Observable<any>{
      return this.http.get(API_URL+"education/all");
    }

    getEducation(id: number):Observable<any>{
      return this.http.get(API_URL+"education/"+id);
    }
  
    createEducation(education:any):Observable<any>{
      console.log(this.headers)
      return this.http.post(API_URL+"education/register", education, {headers: this.headers});
    }
  
    updateEducation(id: number, education:any):Observable<any>{
      return this.http.put(API_URL+"education/"+id, education, {headers: this.headers});
    }
  
    deleteEducationById(id:number):Observable<any>{
      return this.http.delete(API_URL+"education/"+id, {headers: this.headers})
    }   

}
