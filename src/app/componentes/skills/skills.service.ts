import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

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

constructor() { }


  createSkill(skill:string){
    function getRandomInt(min:number, max:number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    this.skills.push({id: getRandomInt(10,99999), skill})
  }

  updateSkill(id:number, skill:string){
    const foundSkill = this.skills.find(skill => skill.id === id)
    if(foundSkill) {
      foundSkill.skill = skill
    }
  }

  deleteSkill(id:number){
    console.log(id)
  const i =  this.skills.findIndex(obj => obj.id === id )
  console.log(i)
  if (i !== -1) {
    this.skills.splice(i, 1)
  }
  }
}
