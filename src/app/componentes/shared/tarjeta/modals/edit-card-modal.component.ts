import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { TarjetaService } from "../tarjeta.service";
import { getDownloadURL, ref, Storage, uploadBytesResumable } from "@angular/fire/storage";
import Toastify from "toastify-js";
import { BusinessCard } from "../card.interface";

@Component({ 
    selector: 'edit-card-modal',
    imports: [FormsModule, NgbDatepickerModule, CommonModule],
    styleUrls: ['./edit-card-modal.css'],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">Edit Card</h4>
              <button
                type="button"
                class="btn-close"
                aria-label="Close button"
                aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 me-1">
                <label class="form-label">Name: </label>
                <input [(ngModel)]="card.name" class="form-control" name="card.name" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Residence: </label>
                <input [(ngModel)]="card.residence" class="form-control" name="card.residence" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">City: </label>
                <input [(ngModel)]="card.city" class="form-control" name="card.city" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Age: </label>
                <input [(ngModel)]="card.age" class="form-control" name="card.age" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Linkedin: </label>
                <input [(ngModel)]="card.linkedin" class="form-control" name="card.linkedin" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Github: </label>
                <input [(ngModel)]="card.github" class="form-control" name="card.github" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Gitlab: </label>
                <input [(ngModel)]="card.gitlab" class="form-control" name="card.gitlab" />
              </div>
              <div class="mb-3 me-1">
                <label class="form-label">Twitter: </label>
                <input [(ngModel)]="card.twitter" class="form-control" name="card.twitter" />
              </div>
              <div class="mb-3">
                <label class="form-label">Avatar: </label>
                <input type="file" accept="image/*" class="form-control" name="file" #upload/>
              </div>
            </div> 
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges(upload)">Save</button>
            </div>
    `,
  })
  export class EditCardModal {
  
    @Input() card!: BusinessCard;

    public cardService = inject(TarjetaService);
    public modal = inject(NgbActiveModal);
    public storage = inject(Storage);

      ngOnInit(){
      }

    async saveChanges(upload:any){

      const file = upload.files[0];
      if(file){
          
        const task = ref(this.storage, file.name);
        
        uploadBytesResumable(task, file).then(async res=>{
          console.log(res)
          if(res.state == "success"){
            const url = await getDownloadURL(task);
            this.card.imageUrl = url;

              this.cardService.updateCard(this.card.id, this.card).subscribe({
                  next: updated => {
                  console.log("updated",updated)
                  this.cardService.cardUpdated.emit(updated)
                  }
              })
            }
          
        })

        this.modal.close('Ok click')

      } else {

        this.cardService.updateCard(this.card.id, this.card).subscribe({
          next: updated => {
          console.log("updated sin imagen",updated)
          this.cardService.cardUpdated.emit(updated)
          }
      })

  

          this.modal.close('Ok click')
      }
    }


  }