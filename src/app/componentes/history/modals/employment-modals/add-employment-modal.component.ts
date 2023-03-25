import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EmploymentsService } from "../../services/employments.service";

@Component({ 
  selector: 'add-employment-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
          <div class="modal-header">
            <h4 class="modal-title" id="modal-title">Update Employmentname</h4>
            <button
              type="button"
              class="btn-close"
              aria-label="Close button"
              aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')"
            ></button>
          </div>
          <div class="modal-body">
            <span>Employmentname: </span>
            <input [(ngModel)]="employmentName" name="employmentName"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
            <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
          </div>
  `,
})
export class AddEmploymentModal {

  employmentName:string = "";

	constructor(public modal: NgbActiveModal, private employmentsService: EmploymentsService) {
  }

  saveChanges(){
    // this.employmentsService.createEmployment(this.employmentName)
    this.modal.close('Ok click')
  }
	
}