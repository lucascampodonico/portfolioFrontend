import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SkillsService } from "../skills.service";

@Component({ 
    selector: 'edit-skill-modal',
    imports: [FormsModule],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">Update Skillname</h4>
              <button
                type="button"
                class="btn-close"
                aria-label="Close button"
                aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"
              ></button>
            </div>
            <div class="modal-body">
              <span>Skillname: </span>
              <input [(ngModel)]="skillName" name="skillName" value="{{skillName}}"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
            </div>
    `,
  })
  export class EditSkillModal {
  
    @Input() skillId!: number;
    @Input() skillName!: string;
  
      constructor(public modal: NgbActiveModal, private skillsService: SkillsService) {
    }
  
    saveChanges(){
      this.skillsService.updateSkill(this.skillId, this.skillName)
      this.modal.close('Ok click')
    }
      
  }