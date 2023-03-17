import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';

import { slideInAnimation } from './animations';
import { AuthService } from './componentes/auth/auth.service';
import { ContactComponent } from './componentes/contact/contact.component';
import { HistoryComponent } from './componentes/history/history.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { TarjetaComponent } from './componentes/shared/tarjeta/tarjeta.component';
import { TopbarComponent } from './componentes/shared/topbar/topbar.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { InViewportDirective } from './inViewPort.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InViewportDirective,
    TopbarComponent,
    SkillsComponent,
    HistoryComponent,
    ContactComponent,
    ProjectsComponent,
    FooterComponent,
    TarjetaComponent,
    NgScrollbarModule,
  ],
  animations: [slideInAnimation],
})
export class AppComponent {
  @ViewChild('scrollable') scrollable!: NgScrollbar;

  title = 'Lucas Campodonico - Resume CV';
  isAuthenticated = false;
  
  constructor(private authService: AuthService){

   this.isAuthenticated = this.authService.verifyToken();
  }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    this.scrollable.scrolled.subscribe((e) => {
      applyClassToXWhenYVisible('current-menu-item', 'contact-menu', 'contact'),
        applyClassToXWhenYVisible(
          'current-menu-item',
          'portfolio-menu',
          'portfolio'
        ),
        applyClassToXWhenYVisible(
          'current-menu-item',
          'skills-menu',
          'skills'
        ),
        applyClassToXWhenYVisible(
          'current-menu-item',
          'history-menu',
          'history'
        );
    });
  }

  scrollTo(e: string) {
    this.scrollable.scrollToElement(e);
  }

}

function applyClassToXWhenYVisible(
  xClass: string,
  menu: string,
  ySelector: string
) {
  const yElement = document.getElementById(ySelector);
  if (!yElement) {
    console.error(`Element with id "${ySelector}" not found`);
    return;
  }

  const yElementTop = yElement.getBoundingClientRect().top;
  const yElementBottom = yElement.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  const xElement = document.getElementById(menu);
  if (!xElement) {
    console.error(`Element with id "${menu}" not found`);
    return;
  }

  if (yElementTop <= windowHeight / 2 && yElementBottom > 300) {
    xElement.classList.add(xClass);
  } else {
    xElement.classList.remove(xClass);
  }

}
