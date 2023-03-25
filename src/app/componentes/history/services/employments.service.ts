import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {

  employments = [
    {
      id: 2,
      name: 'Constru.com',
      dateOf: '2022-02-02',
      dateTo: 'present',
      description: 'Full-stack Developer and SysAdmin'
    },
    {
      id: 1,
      name: 'Rigelec',
      dateOf: '2015-10-15',
      dateTo: '2022-02-01',
      description: 'Full-stack Developer and SysAdmin'
    }
  ];

constructor() {}

  updateEmployment(id:number, employment:any){
    let i = this.employments.findIndex(e => e.id = id);
    if(i > -1){
      this.employments[i].name = employment.name;
      this.employments[i].description = employment.description;
      this.employments[i].dateOf = employment.dateOf;
      this.employments[i].dateTo = employment.dateTo;

    }
  }

  createEmployment(employment:any){
   let mayorId =  this.employments.reduce((prev,next) => { return prev > next ? prev : next})
    
    this.employments.push({
      id: mayorId.id+1,
      name: employment.name,
      description: employment.description,
      dateOf: employment.dateOf,
      dateTo: employment.dateTo

    })

    }
  }

