import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InViewportDirective } from 'src/app/inViewPort.directive';
import { AuthService } from '../auth/auth.service';
import { AddSkillModal } from './modals/add-skill-modal.component';
import { DeleteSkillModal } from './modals/delete-skill-modal.component';
import { EditSkillModal } from './modals/edit-skill-modal.component';
import { SkillsService } from './skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  standalone: true,
  imports: [InViewportDirective, CommonModule, NgbTooltipModule],
})
export class SkillsComponent {
  isEditableSkill: boolean = false;
  isAuthenticated: boolean;

  constructor(
    private _skillsService: SkillsService,
    private authService: AuthService,
    private modal: NgbModal
  ) {
    this.isAuthenticated = this.authService.verifyToken();
  }

  get skills() {
    return this._skillsService.skills;
  }

  openUpdateSkill(skillId: number, skillName: string) {
    const modalRef = this.modal.open(EditSkillModal);
    modalRef.componentInstance.skillId = skillId;
    modalRef.componentInstance.skillName = skillName;
  }
  openDeleteSkill(skillId: number, skillName: string) {
    const modalRef = this.modal.open(DeleteSkillModal);
    modalRef.componentInstance.skillId = skillId;
    modalRef.componentInstance.skillName = skillName;
  }

  openAddSkill() {
    const modalRef = this.modal.open(AddSkillModal);
  }
}
