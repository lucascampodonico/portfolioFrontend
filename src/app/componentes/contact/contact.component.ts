import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { RecaptchaModule } from 'ng-recaptcha';

import Toastify from 'toastify-js';
import { RecaptchaFormsModule } from 'ng-recaptcha/lib/recaptcha-forms.module';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RecaptchaModule]
})
export class ContactComponent implements OnInit {

  captchaResponse = '';
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private contactService: ContactService) {
      this.contactForm = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', Validators.required],
        mensaje: ['', Validators.required],
      })
  }
  

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  sendMail(){
    if(this.contactForm.status === "VALID" && this.captchaResponse != ''){
      this.contactService.sendMail(this.contactForm.value).subscribe({
        next: res => {
          console.log(res)
          Toastify({
            text: "Correo enviado correctamente. Te contestaré a la brevedad. Gracias.",
            className: "info-toast",
            duration: 6000,
            position:"center",
            }).showToast( )
        },
        error: e => {
          console.log(e)
        Toastify({
            text: "Error al enviar correo, verifique los campos.",
            className: "error-toast",
            duration: 6000,
            position:"center",
            }).showToast( )
        }
      })
    } else {
      Toastify({
        text: "Completa todos los campos.",
        className: "error-toast",
        duration: 6000,
        position:"center",
        }).showToast( )
    }
    
  
  }

}
