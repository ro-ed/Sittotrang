import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 

  onEmailEntry(){
    
  }

  onPasswordEntry(){
    
  }

  onLogin (e: any) {
    e.preventDefault();
  }


}
