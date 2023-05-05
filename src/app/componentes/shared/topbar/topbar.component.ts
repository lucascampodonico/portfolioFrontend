import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/componentes/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule],
  templateUrl: './topbar.component.html'
})

export class TopbarComponent implements AfterViewInit{

@Input() scrollbar: any;
@Output() miEvento: EventEmitter<string> = new EventEmitter();

  isAuthenticated = false;

constructor(private modal: NgbModal, private authService: AuthService){

  this.authService.verifyTokens().subscribe(
    {
      next: res => this.isAuthenticated = true,
      error: error => this.isAuthenticated = false,
    }
  )

}

  ngAfterViewInit(): void {
  }

  scrollTo(id:string){
    this.miEvento.emit(id)
  }
  
  openLogin(){
    this.modal.open(LoginComponent, {centered: true, size:'xl'})
  }

  openLogOut(){
    localStorage.clear()
    window.location.reload()
  }

}
