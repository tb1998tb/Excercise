import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef) { }


  @HostListener('mouseover', ['$event.target'])
  hover() {
    this.el.nativeElement.style.backgroundColor = 'aliceblue';
  }

  @HostListener('mouseout', ['$event.target'])
  out() {
    this.el.nativeElement.style.backgroundColor = 'unset';
  }


}
