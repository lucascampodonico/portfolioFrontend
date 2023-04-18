import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true
})
export class ProjectsComponent implements OnInit {

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
  }

  createProject(project:any){
    this.projectsService.createProject(project).subscribe(
      d => console.log(d))
  }

}
