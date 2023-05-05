import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

private token = localStorage.getItem('token');
private headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

projectDeleted = new EventEmitter();
projectCreated = new EventEmitter();
projectUpdated = new EventEmitter();

private http = inject(HttpClient);


  uploadFile(formData: FormData):Observable<any>{
      return this.http.post(API_URL+"media/upload", formData, {headers: this.headers})
  }

  getAllProject():Observable<any>{
    return this.http.get(API_URL+"project/all");
  }

  getProject(id: number):Observable<any>{
    return this.http.get(API_URL+"project/"+id, {headers: this.headers});
  }

  createProject(project:Project):Observable<any>{
    return this.http.post(API_URL+"project/register", project, {headers: this.headers});
  }

  updateProject(id: number, project:Project):Observable<any>{
    return this.http.put(API_URL+"project/"+id, project, {headers: this.headers});
  }

  deleteProjectById(id:number):Observable<any>{
    return this.http.delete(API_URL+"project/"+id, {headers: this.headers})
  }
}
