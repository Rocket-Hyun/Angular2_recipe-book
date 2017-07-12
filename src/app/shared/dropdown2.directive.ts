import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appDropdown2]'
})
export class Dropdown2Directive implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'open');
  }

  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    // this.renderer.addClass(this.elRef.nativeElement, 'open');
    // this.renderer. removeClass(this.elRef.nativeElement, 'open');
  }

  // @HostListener('mouseenter') mouseover(eventData: Event) {
  //   this.renderer.addClass(this.elRef.nativeElement, 'open');
  // }
  //
  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //   this.renderer. removeClass(this.elRef.nativeElement, 'open');
  // }

}
