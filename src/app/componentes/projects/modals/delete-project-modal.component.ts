import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "../projects.service";

@Component({ 
  selector: 'delete-project-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
         <div class="modal-header">
			<h4 class="modal-title" id="modal-title">Project deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete <span class="text-primary">{{project.nameProject}}</span> project?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="saveChanges()">Yes</button>
		</div>
  `,
})
export class DeleteProjectModal {

  @Input() project!: any;

	constructor(public modal: NgbActiveModal, private projectsService: ProjectsService) {
  }

  saveChanges(){
    this.projectsService.deleteProjectById(this.project.id).subscribe({
	next: res =>{
		console.log(res)
	},
	error: e =>{
		console.log(e)
	}})
    this.modal.close('Ok click')
  }
	
}
