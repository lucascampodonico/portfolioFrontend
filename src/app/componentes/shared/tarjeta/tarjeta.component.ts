import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from '../../auth/auth.service';
import { BusinessCard } from './card.interface';
import { EditCardModal } from './modals/edit-card-modal.component';
import { TarjetaService } from './tarjeta.service';
import Toastify from "toastify-js";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../contact/contact.service';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, NgbTooltipModule,ReactiveFormsModule, RecaptchaModule]
})
export class TarjetaComponent implements OnInit {

  estaEnLaPosicionSuperior = false;
  isAuthenticated!: boolean;
  card: BusinessCard = {id: 1, name: "", residence: "", city: "", age: "", linkedin: "", github: "", gitlab: "", twitter: "", imageUrl: "" };
  captchaResponse = '';
  contactForm: FormGroup;

  private cardService = inject(TarjetaService);

  
  constructor(private modal: NgbModal, private authService: AuthService, private fb: FormBuilder, private contactService: ContactService){

    this.authService.verifyTokens().subscribe(
      {
        next: res => this.isAuthenticated = true,
        error: error => this.isAuthenticated = false,
      });
      this.contactForm = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', Validators.required],
        mensaje: ['', Validators.required],
      });

  }



  ngOnInit(): void {

    this.getCard();

    this.cardService.cardUpdated.subscribe({
      next: (card: BusinessCard) => {
          this.card = card;

        Toastify({
          text:"Card Updated.",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #e9a617, #e9a617)",
          }
          }).showToast( )
      }
    })
  }


  openUpdateCard(card:BusinessCard){
    const modalRef = this.modal.open(EditCardModal);
    modalRef.componentInstance.card = card;
  }


  getCard(){
    this.cardService.getCard(1).subscribe({
    next: (card)=> { this.card = card }
    })
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

