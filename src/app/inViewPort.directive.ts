import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective implements OnInit {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'animate__animated');
          this.renderer.addClass(this.el.nativeElement, 'animate__fadeInUp');
          this.renderer.addClass(this.el.nativeElement, 'animate__slow');
        }
      });
    });
    this.observer.observe(this.el.nativeElement);
  }
}

@Directive({
    selector: '[appInViewportLeft]',
    standalone: true
  })
  export class InViewportDirectiveLeft implements OnInit {
    private observer!: IntersectionObserver;
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit() {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'animate__animated');
            this.renderer.addClass(this.el.nativeElement, 'animate__fadeInLeft');
            this.renderer.addClass(this.el.nativeElement, 'animate__slow');
          }
        });
      });
      this.observer.observe(this.el.nativeElement);
    }
  }

  @Directive({
    selector: '[appInViewportRight]',
    standalone: true
  })
  export class InViewportDirectiveRight implements OnInit {
    private observer!: IntersectionObserver;
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit() {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'animate__animated');
            this.renderer.addClass(this.el.nativeElement, 'animate__fadeInRight');
            this.renderer.addClass(this.el.nativeElement, 'animate__slow');
          }
        });
      });
      this.observer.observe(this.el.nativeElement);
    }
  }