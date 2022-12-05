import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string;
  @Input() type = 'text'; //set default type to be text
  @Input() email: string;
  @Input() password: string;
  @Input() name = 'name'; //default set to name.
 
  focused:boolean;

  @Output() childOutput : EventEmitter<string> = new EventEmitter();

  onBlur(event: any) {
    
    const value = event.target.value
    this.childOutput.emit(value);
    if(!value){
      this.focused = false;
    }
  }
}
