import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { DeleteProjectModal } from './modals/delete-project-modal.component';
import { EditProjectModal } from './modals/edit-project-modal.component';
import { Project } from './project.interface';
import { ProjectsService } from './projects.service';
import Toastify  from "toastify-js";

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
    this.authService.verifyTokens().subscribe(
      {
        next: () => this.isAuthenticated = true,
        error: () => this.isAuthenticated = false,
      }
    )
  }

  ngOnInit(): void {

    this.getAllProject()

    this.projectsService.projectDeleted.subscribe({
      next: (project: Project) => {
        const i = this.projects.findIndex(searchedProject => searchedProject.id === project.id )
        if(i != -1){
          this.projects.splice(i, 1)
        }
        Toastify({
          text:"Project deleted.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })

    this.projectsService.projectCreated.subscribe({
      next: (project: Project) => {
  
        this.projects.push(project)
        
        Toastify({
          text:"Project Added.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })

    this.projectsService.projectUpdated.subscribe({
      next: (project: Project) => {
  
        const i = this.projects.findIndex(searchedProject => searchedProject.id === project.id )
        if(i != -1){
          this.projects[i].nameProject = project.nameProject;
          this.projects[i].imageUrl = project.imageUrl;
        }
        
        Toastify({
          text:"Project Updated.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })
  }

  openCreateProject(){
    const modalRef = this.modal.open(EditProjectModal);
    modalRef.componentInstance.title = 'Add';
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
    }
  })
  }

}
