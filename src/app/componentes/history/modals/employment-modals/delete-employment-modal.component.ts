import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EmploymentsService } from "../../services/employments.service";

@Component({ 
  selector: 'delete-employment-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
         <div class="modal-header">
			<h4 class="modal-title" id="modal-title">Employment deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete <span class="text-primary">{{employment.nameEmployment}}</span> employment?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="saveChanges()">Yes</button>
		</div>
  `,
})
export class DeleteEmploymentModal {

  @Input() employment!: any;

	constructor(public modal: NgbActiveModal, private employmentsService: EmploymentsService) {
  }

  saveChanges(){
    this.employmentsService.deleteEmploymentById(this.employment.id).subscribe({
		next: res =>{
			this.employmentsService.employmentDeleted.emit(this.employment)
			console.log(res)
		},
		error: e =>{
			console.log(e)
		}})
    this.modal.close('Ok click')
  }
	
}
