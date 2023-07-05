import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type = 'text'; //set default type to be text
  @Input() username: string;
  @Input() password: string;
  @Input() name = 'name'; //default set to name.
  @Input() icon: string;

  @Input() input: string;
  @Output() inputChange = new EventEmitter<string>();

  svg: any;
  
 
  focused:boolean;

  @Output() childOutput : EventEmitter<string> = new EventEmitter();

  /**
   *
   */
  constructor(private domSanitizer: DomSanitizer) {
    
    
  }

  inputHasChanged(event: any) {
    this.inputChange.emit(this.input)
    console.log("INPUT", this.input)
  }
  onBlur(event: any) {
    
    const value = event.target.value
    this.childOutput.emit(value);
    if(!value){
      this.focused = false;
    }
  }

  ngOnInit() {
    var iconArray = {
      user: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </svg>`,
      
     password: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
     <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
   </svg>`
    } as any;


    Object.keys(iconArray).forEach(key => {
      if (key === this.icon) {
          console.log("Found.", key);
          console.log(iconArray[key])
          this.svg = this.domSanitizer.bypassSecurityTrustHtml(iconArray[key]);
      }
    });



  }

}
