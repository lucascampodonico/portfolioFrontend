import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, NgbTooltipModule]
})
export class TarjetaComponent implements OnInit {

  estaEnLaPosicionSuperior = false;
  isAuthenticated!: boolean;

  constructor(private modal: NgbModal, private authService: AuthService){

    this.authService.verifyTokens().subscribe(
      {
        next: res => this.isAuthenticated = true,
        error: error => this.isAuthenticated = false,
      }
    )
  }

  ngOnInit(): void {
   
  }

  onScroll(event:any){
    console.log(event)
  }
}
