import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SkillsService } from "../skills.service";

@Component({ 
  selector: 'delete-skill-modal',
  imports: [FormsModule],
  standalone: true,
  template: `
         <div class="modal-header">
			<h4 class="modal-title" id="modal-title">Skill deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Are you sure you want to delete <span class="text-primary">{{skillName}}</span> skill?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="saveChanges()">Yes</button>
		</div>
  `,
})
export class DeleteSkillModal {

  @Input() skillId!: number;
  @Input() skillName!: string;

	constructor(public modal: NgbActiveModal, private skillsService: SkillsService) {
  }

  saveChanges(){
    this.skillsService.deleteSkill(this.skillId)
    this.modal.close('Ok click')
  }
	
}
