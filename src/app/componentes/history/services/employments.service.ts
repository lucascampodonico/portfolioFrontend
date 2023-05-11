import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {

  // employments = [
  //   {
  //     id: 2,
  //     name: 'Constru.com',
  //     dateOf: '2022-02-02',
  //     dateTo: 'present',
  //     description: 'Full-stack Developer and SysAdmin'
  //   },
  //   {
  //     id: 1,
  //     name: 'Rigelec',
  //     dateOf: '2015-10-15',
  //     dateTo: '2022-02-01',
  //     description: 'Full-stack Developer and SysAdmin'
  //   }
  // ];
private http = inject(HttpClient);
private token = localStorage.getItem('token');
private headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

employmentDeleted = new EventEmitter();
employmentCreated = new EventEmitter();
employmentUpdated = new EventEmitter();

  // updateEmployments(id:number, employment:any){

  //   let i = this.employments.findIndex(e => e.id = id);
  //   if(i > -1){
  //     this.employments[i].name = employment.name;
  //     this.employments[i].description = employment.description;
  //     this.employments[i].dateOf = employment.dateOf;
  //     this.employments[i].dateTo = employment.dateTo;

  //   }
  // }

  // createEmployments(employment:any){
  //  let mayorId =  this.employments.reduce((prev,next) => { return prev > next ? prev : next})
    
  //   this.employments.push({
  //     id: mayorId.id+1,
  //     name: employment.name,
  //     description: employment.description,
  //     dateOf: employment.dateOf,
  //     dateTo: employment.dateTo

  //   })

  //   }

    getAllEmployment():Observable<any>{
      return this.http.get(API_URL+"employment/all");
    }
  
    getEmployment(id: number):Observable<any>{
      return this.http.get(API_URL+"employment/"+id, {headers: this.headers});
    }
  
    createEmployment(employment:any):Observable<any>{
      console.log(this.headers)
      return this.http.post(API_URL+"employment/register", employment, {headers: this.headers});
    }
  
    updateEmployment(id: number, employment:any):Observable<any>{
      return this.http.put(API_URL+"employment/"+id, employment, {headers: this.headers});
    }
  
    deleteEmploymentById(id:number):Observable<any>{
      return this.http.delete(API_URL+"employment/"+id, {headers: this.headers})
    }
  }

