import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportDirective } from 'src/app/inViewPort.directive';
import { AuthService } from '../auth/auth.service';

import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { EmploymentsService } from './services/employments.service';
import { EditEmploymentModal } from './modals/employment-modals/edit-employment-modal.component';
import { DeleteEmploymentModal } from './modals/employment-modals/delete-employment-modal.component';

import { EducationsService } from './services/educations.service';
import { EditEducationModal } from './modals/education-modals/edit-education-modal.component';
import { DeleteEducationModal } from './modals/education-modals/delete-education-modal.component';
import Toastify from "toastify-js"

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, InViewportDirective, NgbTooltipModule],
  templateUrl: './history.component.html'
})
export class HistoryComponent {

    public isAuthenticated!: boolean;

    private _employmentsService = inject(EmploymentsService);
    private _educationsService = inject(EducationsService);
    private _authService = inject(AuthService);
    private _modal = inject(NgbModal);

    public employments:any;
    public educations:any;

    constructor(){
      this._authService.verifyTokens().subscribe(
        {
          next: res => this.isAuthenticated = true,
          error: error => this.isAuthenticated = false,
        }
      )
    }

    ngOnInit(){
    
      this.getAllEmployments();
      this.getAllEducations();
      this._employmentsService.employmentDeleted.subscribe({
        next: (employment: any) => {
          const i = this.employments.findIndex((searchedEmployment: { id: any; }) => searchedEmployment.id === employment.id )
          if(i != -1){
            this.employments.splice(i, 1)
          }
          Toastify({
            text:"Employment deleted.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });
      this._employmentsService.employmentCreated.subscribe({
        next: (employment: any) => {
    
          this.employments.push(employment)
          
          Toastify({
            text:"Employment Added.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });
      this._employmentsService.employmentUpdated.subscribe({
        next: (employment: any) => {
    
          const i = this.employments.findIndex((searchedEmployment: { id: any; }) => searchedEmployment.id === employment.id )
          if(i != -1){
            this.employments[i].nameEmployment = employment.nameEmployment;
            this.employments[i].imageUrl = employment.imageUrl;
          }
          
          Toastify({
            text:"Employment Updated.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });
      this._educationsService.educationDeleted.subscribe({
        next: (education: any) => {
          const i = this.educations.findIndex((searchedEmployment: { id: any; }) => searchedEmployment.id === education.id )
          if(i != -1){
            this.educations.splice(i, 1)
          }
          Toastify({
            text:"Education deleted.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });
      this._educationsService.educationCreated.subscribe({
        next: (education: any) => {
    
          this.educations.push(education)
          
          Toastify({
            text:"Education Added.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });
      this._educationsService.educationUpdated.subscribe({
        next: (education: any) => {
    
          const i = this.educations.findIndex((searchedEmployment: { id: any; }) => searchedEmployment.id === education.id )
          if(i != -1){
            this.educations[i].nameEmployment = education.nameEmployment;
            this.educations[i].imageUrl = education.imageUrl;
          }
          
          Toastify({
            text:"Education Updated.",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e9a617, #e9a617)",
            }
            }).showToast( )
        }
      });

    }

    /**************  Employment methods *******************/
    openUpdateEmployment(employment:any){
      const modalRef = this._modal.open(EditEmploymentModal);
      modalRef.componentInstance.employment = employment;
      modalRef.componentInstance.title = 'Update';
    }

    openCreateEmployment(){
      const modalRef = this._modal.open(EditEmploymentModal);
      modalRef.componentInstance.title = 'Create';
    }

    openDeleteEmployment(employment:any){
      const modalRef = this._modal.open(DeleteEmploymentModal);
      modalRef.componentInstance.employment = employment;
    }
    
    getAllEmployments(){
      this._employmentsService.getAllEmployment().subscribe({
      next: (employments)=> {
        this.employments = employments
      }
      })
    }

    /**************  Education methods *******************/

    openUpdateEducation(education:any){
      const modalRef = this._modal.open(EditEducationModal);
      modalRef.componentInstance.education = education;
      modalRef.componentInstance.title = 'Update';
    }

    openCreateEducation(){
      const modalRef = this._modal.open(EditEducationModal);
      modalRef.componentInstance.title = 'Create';
    }

    openDeleteEducation(education:any){
      const modalRef = this._modal.open(DeleteEducationModal);
      modalRef.componentInstance.education = education;
    }

    getAllEducations(){
      this._educationsService.getAllEducations().subscribe({
      next: (educations)=> {
        this.educations = educations
      }
      })
    }

}
