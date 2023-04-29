import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { Project } from "../project.interface";
import { ProjectsService } from "../projects.service";
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from "@angular/fire/storage";

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
                <input [(ngModel)]="project.nameProject" class="form-control" name="project.nameProject" />
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


      constructor(public modal: NgbActiveModal, private projectsService: ProjectsService, private storage: Storage) {}
    
      ngOnInit(){
        if(!this.project){
          this.project = {
            nameProject: "",
            imageUrl: ""
          }
        }
      }

      onFileChange($event: any) {
        const file = $event.target.files[0]; // Obtén el archivo seleccionado por el usuario
        if(file){
          
          const task = ref(this.storage, file.name);
          
          uploadBytesResumable(task, file).then((d)=>{
            console.log(d)
          })
  
        }
      }


    async saveChanges(upload:any){
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
                },
                error: e => {
                  console.log(e)
                }
              })
            } else {
              this.projectsService.updateProject(this.project.id, this.project).subscribe({
                  next: updated => {
                  console.log("updated",updated)
                  }
              })
            }
          }
        })
        
      } else {
        this.projectsService.updateProject(this.project.id, this.project).subscribe({
          next: updated => {
          console.log("updated sin imagen",updated)
          }
      })
      }
      
      this.modal.close('Ok click')
    }


  }