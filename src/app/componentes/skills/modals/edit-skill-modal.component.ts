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
              <h4 class="modal-title" id="modal-title">{{title}} Skillname</h4>
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
              <input [(ngModel)]="nameSkill" name="skillName" value="{{skill.nameSkill}}"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
            </div>
    `,
  })
  export class EditSkillModal {
  
    @Input() skill!: any;
    @Input() title!: string;
    
    nameSkill!:string;
      constructor(public modal: NgbActiveModal, private skillsService: SkillsService) {
    }

    ngOnInit(){
      if(!this.skill){
        this.skill = {
          skill: "",
        }
      }
    }
  
    saveChanges(){

      this.skill.nameSkill = this.nameSkill;

      if(!this.skill.id){
        this.skillsService.createSkill(this.skill).subscribe(
          skill => this.skillsService.skillCreated.emit(skill))
      } else {

        this.skillsService.updateSkill(this.skill.id, this.skill.nameSkill).subscribe(
          skill => this.skillsService.skillUpdated.emit(skill))

      }

      
      this.modal.close('Ok click')
    }
      
  }