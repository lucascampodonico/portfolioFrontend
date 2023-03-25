import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { EducationsService } from "../../services/educations.service";

@Component({ 
    selector: 'edit-education-modal',
    imports: [FormsModule, NgbDatepickerModule, CommonModule],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">{{title}} Education</h4>
              <button
                type="button"
                class="btn-close"
                aria-label="Close button"
                aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Education: </label>
                <input [(ngModel)]="education.name" class="form-control" name="education.name" />
              </div>

              <div class="row">
              
                  <div class="col-6">
                  <label class="form-label">Date Of: </label>
                    <div class="input-group">
                        <input
                          class="form-control"
                          placeholder="yyyy-mm-dd"
                          name="dateOf"
                          [(ngModel)]="dateOf"
                          ngbDatepicker
                          #d2="ngbDatepicker"
                        />
                        <button class="btn btn-outline-secondary bi bi-calendar3" (click)="d2.toggle()" type="button"></button>
                      </div>
                  </div> 
                  <div class="col-6">
                    <div class="d-flex justify-content-between">
                      <label class="form-label">Date To: </label>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" [(ngModel)]="toPresent" name="toPresent">
                        <label class="form-check-label" for="flexCheckDefault">
                          present
                        </label>
                      </div>
                    </div>
                 
                    <div class="input-group" *ngIf="!toPresent">
                      <input
                        class="form-control"
                        placeholder="yyyy-mm-dd"
                        name="dateTo"
                        [(ngModel)]="dateTo"
                        ngbDatepicker
                        #d="ngbDatepicker"
                      />
                      <button class="btn btn-outline-secondary bi bi-calendar3" (click)="d.toggle()" type="button"></button>
                    </div>   
                  </div>  
            </div> 
              <div class="mb-3">
                <label class="form-label">Description: </label>
                <textarea [(ngModel)]="education.description" class="form-control" name="education.description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
            </div>
    `,
  })
  export class EditEducationModal {
  
    @Input() education!: any;
    @Input() title!: string;

    dateOf: any;
    dateTo: any;
    toPresent:boolean = false;

      constructor(public modal: NgbActiveModal, private educationsService: EducationsService) {}

      ngOnInit(){
        if(this.education){
          let dateOf = this.education.dateOf.split('-');
          let dateTo = '';

          if(this.education.dateTo === 'present'){
            this.toPresent = true;
          } else {
            dateTo = this.education.dateTo.split('-');
          }
          
    
        this.dateOf = {
            year: parseInt(dateOf[0]),
            month: parseInt(dateOf[1]),
            day: parseInt(dateOf[2]),
          }
          this.dateTo = {
            year: parseInt(dateTo[0]),
            month: parseInt(dateTo[1]),
            day: parseInt(dateTo[2]),
          }
        } else {
          this.education = {
            name: '',
            description: '',
            dateOf: '',
            dateTo: ''
          }
        }
      }
    
    saveChanges(){
      this.education.dateOf = `${this.dateOf.year}-${padNumber(this.dateOf.month)}-${padNumber(this.dateOf.day)}`;
      
      if(this.toPresent){
        this.education.dateTo = 'present';
      } else {
        this.education.dateTo = `${this.dateTo.year}-${this.dateTo.month}-${this.dateTo.day}`;
      }
      
      // this.educationsService.updateEducation(this.educationId, this.education)
      this.modal.close('Ok click')
    }


  }

  function padNumber(value:number){
    return ('0'+value).slice(-2)
  }