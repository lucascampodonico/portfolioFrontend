import { Component } from '@angular/core';
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

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, InViewportDirective, NgbTooltipModule],
  templateUrl: './history.component.html'
})
export class HistoryComponent {

    isAuthenticated: boolean;

    constructor( private _employmentsService: EmploymentsService, private _educationsService: EducationsService, private authService: AuthService, private modal: NgbModal ){
      this.isAuthenticated = this.authService.verifyToken()
    }

    get employments(){
      return this._employmentsService.employments.sort((a,b) => b.id - a.id)
    }
    get educations(){
      return this._educationsService.educations.sort((a,b) => b.id - a.id)
    }


    // Employment methods
    openUpdateEmployment(employment:any){

      const modalRef = this.modal.open(EditEmploymentModal);
      modalRef.componentInstance.employment = employment;
      modalRef.componentInstance.title = 'Update';
    }

    openCreateEmployment(){

      const modalRef = this.modal.open(EditEmploymentModal);
      modalRef.componentInstance.title = 'Create';
    }

    openDeleteEmployment(employment:any){
      const modalRef = this.modal.open(DeleteEmploymentModal);
      modalRef.componentInstance.employment = employment;
    }


    //Education methods

    openUpdateEducation(education:any){

      const modalRef = this.modal.open(EditEducationModal);
      modalRef.componentInstance.education = education;
      modalRef.componentInstance.title = 'Update';
    }

    openCreateEducation(){

      const modalRef = this.modal.open(EditEducationModal);
      modalRef.componentInstance.title = 'Create';
    }

    openDeleteEducation(education:any){
      const modalRef = this.modal.open(DeleteEducationModal);
      modalRef.componentInstance.education = education;
    }

}
