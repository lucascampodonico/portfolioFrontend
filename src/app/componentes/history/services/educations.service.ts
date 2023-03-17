import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  educations = [
    {
      id: 1,
      name: 'UNER',
      dateOf: '11-10-2010',
      dateTo: '12-01-2015',
      description: 'Licensed in Systems'
    },
    {
      id: 2,
      name: 'Udemy',
      dateOf: '11-05-2021',
      dateTo: '12-01-2023',
      description: 'Multiple Courses'
    }
  ];

constructor() { }

}
