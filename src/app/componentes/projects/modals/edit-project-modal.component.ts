import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "../projects.service";
import { getDownloadURL, ref, Storage, uploadBytesResumable } from "@angular/fire/storage";
import Toastify from "toastify-js";

@Component({ 
    selector: 'edit-project-modal',
    imports: [FormsModule, NgbDatepickerModule, CommonModule],
    standalone: true,
    template: `
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">{{title}} Project</h4>
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
                <label class="form-label">Project: </label>
                <input [(ngModel)]="nameProject" class="form-control" name="project.nameProject" />
              </div>
              <div class="mb-3">
                <label class="form-label">Imagen: </label>
                <input type="file" accept="image/*" class="form-control" name="file" #upload/>
              </div>
            </div> 
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
              <button type="button" ngbAutofocus class="btn btn-danger" (click)="saveChanges(upload)">Save</button>
            </div>
    `,
  })
  export class EditProjectModal {
  
    @Input() project!: any;
    @Input() title!: string;

    nameProject!: string;

    public projectsService = inject(ProjectsService);
    public modal = inject(NgbActiveModal);
    public storage = inject(Storage);

      ngOnInit(){
        if(!this.project){
          this.project = {
            nameProject: "",
            imageUrl: ""
          }
        }
      }

    async saveChanges(upload:any){

      this.project.nameProject = this.nameProject;
      const file = upload.files[0];
      if(file){
          
        const task = ref(this.storage, file.name);
        
        uploadBytesResumable(task, file).then(async res=>{
          console.log(res)
          if(res.state == "success"){
            const url = await getDownloadURL(task);
            this.project.imageUrl = url;

            if(!this.project.id){
              this.projectsService.createProject(this.project).subscribe({
                next: project => {
                  console.log("projecto creado",project)
                  this.projectsService.projectCreated.emit(project)
                },
                error: e => {
                  console.log(e)
                }
              })
            } else {
              this.projectsService.updateProject(this.project.id, this.project).subscribe({
                  next: updated => {
                  console.log("updated",updated)
                  this.projectsService.projectUpdated.emit(updated)
                  }
              })
            }
          }
        })

        this.modal.close('Ok click')

      } else {
        Toastify({
          text:"Por favor agrega una imagen.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast()
      }
    }


  }