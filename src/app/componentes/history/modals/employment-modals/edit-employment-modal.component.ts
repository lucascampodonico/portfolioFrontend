import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { EmploymentsService } from "../../services/employments.service";
import Toastify from "toastify-js";

@Component({ 
    selector: 'edit-employment-modal',
    imports: [FormsModule, NgbDatepickerModule, CommonModule],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">{{title}} Employment</h4>
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
                <input [(ngModel)]="employment.nameEmployment" class="form-control" name="employment.nameEmployment" />
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
    @Input() title!: string;

    toPresent:boolean = false;
    dateOf: any;
    dateTo: any;


      constructor(public modal: NgbActiveModal, private employmentsService: EmploymentsService) {}

      ngOnInit(){
        if(this.employment){
          let dateOf = this.employment.dateFrom.split('-');;
          let dateTo = '';

          if(this.employment.dateTo === 'present'){
            this.toPresent = true;
          } else {
            dateTo = this.employment.dateTo.split('-');
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
          this.employment = {
            name: '',
            description: '',
            dateOf: '',
            dateTo: ''
          }
        }
       
      }
    
    saveChanges(){
      this.employment.dateFrom = `${this.dateOf.year}-${padNumber(this.dateOf.month)}-${padNumber(this.dateOf.day)}`;
      
      if(this.toPresent){
        this.employment.dateTo = 'present';
      } else {
        this.employment.dateTo = `${this.dateTo.year}-${padNumber(this.dateTo.month)}-${padNumber(this.dateTo.day)}`;
      }
      
      if(this.employment.id){
        this.employmentsService.updateEmployment(this.employment.id, this.employment).subscribe({
          next: employment => {
            this.employmentsService.employmentUpdated.emit(employment);
            this.modal.close('Ok click');
          },
          error: e => {
            Toastify({
              text:"Verifique los campos.",
              className: "info",
              position: "center",
              style: {
                background: "linear-gradient(to right, #e9a617, #e9a617)",
              }
              }).showToast( )
          }
        });
      } else {
        this.employmentsService.createEmployment(this.employment).subscribe({
          next: employment => {
            this.employmentsService.employmentCreated.emit(employment)
            this.modal.close('Ok click')
          },
          error: e => {
            Toastify({
              text:"Verifique los campos.",
              className: "info",
              position: "center",
              style: {
                background: "linear-gradient(to right, #e9a617, #e9a617)",
              }
              }).showToast( )
          }
        });
      }
    }


  }

  function padNumber(value:number){
    return ('0'+value).slice(-2)
  }