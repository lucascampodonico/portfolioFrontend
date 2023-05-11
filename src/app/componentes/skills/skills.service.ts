import { EventEmitter, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_URL } from 'src/config';
import { Skill } from './skills.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills = [
    {
      id: 1,
      skill: 'JAVA'
    },
    {
      id: 2,
      skill: 'Spring Boot'
    },
    {
      id: 3,
      skill: 'Spring Security'
    },
    {
      id: 4,
      skill: 'JPA'
    },
    {
      id: 5,
      skill: 'NestJS'
    },
    {
      id: 6,
      skill: 'NodeJS'
    },
    {
      id: 7,
      skill: 'Typescript'
    },
    {
      id: 8,
      skill: 'Angular'
    },
    {
      id: 9,
      skill: 'MongoDB'
    },
    {
      id: 10,
      skill: 'MySQL'
    },
    {
      id: 11,
      skill: 'MongoDB'
    },
    {
      id: 12,
      skill: 'HTML and CSS'
    },
    {
      id: 13,
      skill: 'Git/Version Control'
    },
    {
      id: 14,
      skill: 'Angular CLI'
    },
    {
      id: 15,
      skill: 'JavaScript'
    },
    {
      id: 16,
      skill: 'Responsive Design'
    },
    {
      id: 17,
      skill: 'Testing and Debugging'
    },
    {
      id: 18,
      skill: 'Teamwork and commitment'
    }
  ]

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  
  skillDeleted = new EventEmitter();
  skillCreated = new EventEmitter();
  skillUpdated = new EventEmitter();
  
  private http = inject(HttpClient);


  getAllSkill():Observable<any>{
    return this.http.get(API_URL+"skill/all");
  }

  getSkill(id: number):Observable<any>{
    return this.http.get(API_URL+"skill/"+id, {headers: this.headers});
  }

  createSkill(skill:Skill):Observable<any>{
    return this.http.post(API_URL+"skill/register", skill, {headers: this.headers});
  }

  updateSkill(id: number, skill:Skill):Observable<any>{
    const nameSkill = {
      nameSkill: skill
    }
    return this.http.put(API_URL+"skill/"+id, nameSkill, {headers: this.headers});
  }

  deleteSkillById(id:number):Observable<any>{
    return this.http.delete(API_URL+"skill/"+id, {headers: this.headers})
  }
}
