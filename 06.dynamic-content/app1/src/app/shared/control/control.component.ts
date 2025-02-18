import { Component, ElementRef, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  label = input.required<string>();
  private el = inject(ElementRef);

  // @HostListener('click') onClick() {
  onClick() {
    console.log('ControlComponent.onClick');
    console.log(this.el);
  }
}
