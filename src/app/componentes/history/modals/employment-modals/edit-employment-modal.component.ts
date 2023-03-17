import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { EmploymentsService } from "../../services/employments.service";

@Component({ 
    selector: 'edit-employment-modal',
    imports: [FormsModule, NgbDatepickerModule, CommonModule],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">Update Employmentname</h4>
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
                <label class="form-label">Employment: </label>
                <input [(ngModel)]="employment.name" class="form-control" name="employment.name" />
              </div>
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
              <div class="input-group">
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
              <div class="mb-3">
                <label class="form-label">Description: </label>
                <textarea [(ngModel)]="employment.description" class="form-control" name="employment.description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges()">Save</button>
            </div>
    `,
  })
  export class EditEmploymentModal {
  
    @Input() employment!: any;

    dateOf: any;
    dateTo: any;

      constructor(public modal: NgbActiveModal, private employmentsService: EmploymentsService) {}

      ngOnInit(){
        let dateOf = this.employment.dateOf.split('-');
        let dateTo = this.employment.dateOf.split('-');
  
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
      }
    
    saveChanges(){
      this.employment.dateOf = `${this.dateOf.year}-${padNumber(this.dateOf.month)}-${padNumber(this.dateOf.day)}`;
      this.employment.dateTo = `${this.dateTo.year}-${this.dateTo.month}-${this.dateTo.day}`;
      // this.employmentsService.updateEmployment(this.employmentId, this.employment)
      this.modal.close('Ok click')
    }


  }

  function padNumber(value:number){
    return ('0'+value).slice(-2)
  }