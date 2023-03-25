import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EducationsService } from "../../services/educations.service";

@Component({ 
  selector: 'delete-education-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
         <div class="modal-header">
			<h4 class="modal-title" id="modal-title">Education deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete <span class="text-primary">{{educationName}}</span> education?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="saveChanges()">Yes</button>
		</div>
  `,
})
export class DeleteEducationModal {

  @Input() educationId!: number;
  @Input() educationName!: string;

	constructor(public modal: NgbActiveModal, private educationsService: EducationsService) {
  }

  saveChanges(){
    // this.educationsService.deleteEducation(this.educationId)
    this.modal.close('Ok click')
  }
	
}
