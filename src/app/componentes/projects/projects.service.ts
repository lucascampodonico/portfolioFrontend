import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PojectsService {

private api = "https://portfolio-backend-yx5v.onrender.com/api/v1/"
private token = localStorage.getItem('token');
private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

constructor(private http: HttpClient) { 

}

  uploadFile(formData: FormData):Observable<any>{
      return this.http.post(this.api+"media/upload", formData, {headers: this.headers})
  }

  getAllProject():Observable<any>{
    return this.http.get(this.api+"projects");
  }

  getProject(id: number):Observable<any>{
    return this.http.get(this.api+"projects/"+id, {headers: this.headers});
  }

  createProject(project:any):Observable<any>{
    return this.http.post(this.api+"projects/register", project, {headers: this.headers});
  }

  updateProject(project:any):Observable<any>{
    return this.http.post(this.api+"projects/register", project, {headers: this.headers});
  }

  deleteProject(id:number):Observable<any>{
    return this.http.delete(this.api+"projects/"+id, {headers: this.headers})
  }
}
