import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Toastify from 'toastify-js'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, public modal: NgbActiveModal){

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  login(){
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        {
          next: d=> {
            localStorage.setItem('token', d.token)
            this.modal.close()
            this.router.navigateByUrl(this.router.url)
            setTimeout(() => {
              window.location.reload()
            }, 100);
          },
          error: (e) => {
            console.log(e)
              Toastify({
              text: e.error.mensaje,
              className: "warning",
              style: {
                background: "linear-gradient(to right, red, #911e29)",
              }
              }).showToast( )
          } 
        })
     
      
    }

   
}

