import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "../projects.service";

@Component({ 
  selector: 'add-project-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
          <div class="modal-header">
            <h4 class="modal-title" id="modal-title">Update Projectname</h4>
            <button
              type="button"
              class="btn-close"
              aria-label="Close button"
              aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')"
            ></button>
          </div>
          <div class="modal-body">
            <span>Projectname: </span>
            <input [(ngModel)]="projectName" name="projectName"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
            <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
          </div>
  `,
})
export class AddProjectModal {

  projectName:string = "";

	constructor(public modal: NgbActiveModal, private projectsService: ProjectsService) {
  }

  saveChanges(){
    this.projectsService.createProject(this.projectName)
    this.modal.close('Ok click')
  }
	
}