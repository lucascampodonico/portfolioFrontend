import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {

  employments = [
    {
      id: 1,
      name: 'Constru.com',
      dateOf: '2022-02-02',
      dateTo: 'present',
      description: 'Full-stack Developer and SysAdmin'
    },
    {
      id: 2,
      name: 'Rigelec',
      dateOf: '2015-10-15',
      dateTo: '2022-02-01',
      description: 'Full-stack Developer and SysAdmin'
    }
  ];

constructor() {}

}
