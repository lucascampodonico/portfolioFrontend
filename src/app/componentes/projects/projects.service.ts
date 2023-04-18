import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

private token = localStorage.getItem('token');
private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

constructor(private http: HttpClient) { 

}

  uploadFile(formData: FormData):Observable<any>{
      return this.http.post(API_URL+"media/upload", formData, {headers: this.headers})
  }

  getAllProject():Observable<any>{
    return this.http.get(API_URL+"projects");
  }

  getProject(id: number):Observable<any>{
    return this.http.get(API_URL+"projects/"+id, {headers: this.headers});
  }

  createProject(project:any):Observable<any>{
    return this.http.post(API_URL+"projects/register", project, {headers: this.headers});
  }

  updateProject(project:any):Observable<any>{
    return this.http.post(API_URL+"projects/register", project, {headers: this.headers});
  }

  deleteProject(id:number):Observable<any>{
    return this.http.delete(API_URL+"projects/"+id, {headers: this.headers})
  }
}
