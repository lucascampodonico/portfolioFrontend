import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InViewportDirective } from 'src/app/inViewPort.directive';
import { AuthService } from '../auth/auth.service';
import { DeleteSkillModal } from './modals/delete-skill-modal.component';
import { EditSkillModal } from './modals/edit-skill-modal.component';
import { Skill } from './skills.interface';
import { SkillsService } from './skills.service';
import Toastify from "toastify-js";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  standalone: true,
  imports: [InViewportDirective, CommonModule, NgbTooltipModule],
})
export class SkillsComponent {
  isEditableSkill: boolean = false;
  isAuthenticated!: boolean;

  constructor(
    private _skillsService: SkillsService,
    private authService: AuthService,
    private modal: NgbModal
  ) {
    this.authService.verifyTokens().subscribe(
      {
        next: res => this.isAuthenticated = true,
        error: error => this.isAuthenticated = false,
      }
    )
  }

  skills!: Skill[];


  ngOnInit(): void {

    this.getAllSkill()

    this._skillsService.skillDeleted.subscribe({
      next: (skill: Skill) => {
        const i = this.skills.findIndex(searchedSkill => searchedSkill.id === skill.id )
        if(i != -1){
          this.skills.splice(i, 1)
        }
        Toastify({
          text:"Skill deleted.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })

    this._skillsService.skillCreated.subscribe({
      next: (skill: Skill) => {
  
        this.skills.push(skill)
        
        Toastify({
          text:"Skill Added.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })

    this._skillsService.skillUpdated.subscribe({
      next: (skill: Skill) => {

        const i = this.skills.findIndex(searchedSkill => searchedSkill.id === skill.id )
        if(i != -1){
          this.skills[i].nameSkill = skill.nameSkill
        }
        
        Toastify({
          text:"Skill Updated.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })
  }


  openUpdateSkill(skill:Skill) {
    const modalRef = this.modal.open(EditSkillModal);
    modalRef.componentInstance.title = "Update";
    modalRef.componentInstance.skill = skill;
  }
  openDeleteSkill(skill: Skill) {
    const modalRef = this.modal.open(DeleteSkillModal);
    modalRef.componentInstance.skill = skill;
  }

  openAddSkill() {
    const modalRef = this.modal.open(EditSkillModal);
    modalRef.componentInstance.title = "Add";
  }

  getAllSkill(){
    this._skillsService.getAllSkill().subscribe({
    next: (skills)=> {
      this.skills = skills
      console.log(this.skills)
    }
  })
  }
}
