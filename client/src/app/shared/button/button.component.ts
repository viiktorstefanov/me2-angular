import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() textBtn?: string = '';
  @Input() typeBtn?: string = 'submit';
  @Input() form?: { invalid: boolean };

}
