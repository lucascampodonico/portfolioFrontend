import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportDirective } from 'src/app/inViewPort.directive';
import { AuthService } from '../auth/auth.service';
import { EmploymentsService } from './services/employments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmploymentModal } from './modals/employment-modals/edit-employment-modal.component';
import { DeleteEmploymentModal } from './modals/employment-modals/delete-employment-modal.component';
import { EducationsService } from './services/educations.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, InViewportDirective],
  templateUrl: './history.component.html'
})
export class HistoryComponent {

    isAuthenticated: boolean;

    constructor( private _employmentsService: EmploymentsService, private _educationsService: EducationsService, private authService: AuthService, private modal: NgbModal ){
      this.isAuthenticated = this.authService.verifyToken()
    }

    get employments(){
      return this._employmentsService.employments
    }
    get educations(){
      return this._educationsService.educations
    }


    openUpdateEmployment(employment:any){

      const modalRef = this.modal.open(EditEmploymentModal);
      modalRef.componentInstance.employment = employment;
    }

    openDeleteEmployment(employment:any){
      const modalRef = this.modal.open(DeleteEmploymentModal);
      modalRef.componentInstance.employment = employment;
    }
}
