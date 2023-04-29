import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { DeleteProjectModal } from './modals/delete-project-modal.component';
import { EditProjectModal } from './modals/edit-project-modal.component';
import { Project } from './project.interface';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule]
})
export class ProjectsComponent implements OnInit {

  projects!: Project[];
  isAuthenticated!: boolean;

  constructor(private projectsService: ProjectsService, private modal: NgbModal, private authService: AuthService) { 
    this.isAuthenticated = this.authService.verifyToken();
  }

  ngOnInit(): void {
    this.getAllProject()
  }

  openCreateProject(){
    const modalRef = this.modal.open(EditProjectModal);
    modalRef.componentInstance.title = 'Update';
  }

  openUpdateProject(project:any){

    const modalRef = this.modal.open(EditProjectModal);
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.title = 'Update';
  }

  openDeleteProject(project:any){
    const modalRef = this.modal.open(DeleteProjectModal);
    modalRef.componentInstance.project = project;
  }

  getAllProject(){
    this.projectsService.getAllProject().subscribe({
    next: (projects)=> {
      this.projects = projects
      console.log(projects)
    }
  })
  }

  getProjectById(){

  }

}
