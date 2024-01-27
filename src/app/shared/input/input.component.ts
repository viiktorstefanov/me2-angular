import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() inputType: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() formControlName: string = '';
 
}
