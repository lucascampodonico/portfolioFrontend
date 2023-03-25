import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  educations = [
    {
      id: 1,
      name: 'UNER',
      dateOf: '2010-10-11',
      dateTo: '2015-01-12',
      description: 'Licensed in Systems'
    },
    {
      id: 2,
      name: 'Udemy',
      dateOf: '2021-05-11',
      dateTo: '2023-01-12',
      description: 'Multiple Courses'
    }
  ];

constructor() { }

}
