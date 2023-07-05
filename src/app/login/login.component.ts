import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  @Input() label: string;
  @Input() type = 'text'; //set default type to be text
  @Input() username: string;
  @Input() password: string;
  @Input() name = 'name'; //default set to name.
  @Input() icon: string;
  svg: any;
  focused:boolean;
  usernameIsFocused:boolean;
  passwordIsFocused:boolean;
  usernameEmpty: boolean;
  rememberCredentials: boolean;
  @Output() childOutput : EventEmitter<string> = new EventEmitter();
  

  // @Output() username: string;
  // @Output() password: string;
  errorMsg: any;
  successIcon: any;
  failureIcon: any;

  constructor(private router: Router, private domSanitizer: DomSanitizer) {
    
    
  }

  NgOnInit(){
    let id = (id: any) => document.getElementById(id);

    let classes = (classes: any) => document.getElementsByClassName(classes);
    
    let username = id("username"),
      email = id("email"),
      password = id("password"),
      form = id("form");

      this.errorMsg = classes("error"),
      this.successIcon = classes("success-icon"),
      this.failureIcon = classes("failure-icon");
    
    // Adding the submit event Listener
    
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
    
      this.validator(username, 0, "Username cannot be blank");
      this.validator(email, 1, "Email cannot be blank");
      this.validator(password, 2, "Password cannot be blank");
    });

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
 
  onEmailEntry(){
    
  }

  onPasswordEntry(){
    
  }

  onLogin (e: any) {
    e.preventDefault();
  }

  login(e: any){
    e.preventDefault();
    let username = document.getElementById("username") as HTMLInputElement;
    let userNameValue = this.username
    console.log("USRNAME", username.value)
    let password = document.getElementById("password") as HTMLInputElement;
    let passwordValue = this.password
    console.log(passwordValue)
    if(userNameValue === "robin@goalachiever.se" && passwordValue === "123"){
       this.router.navigate(["home"]);
    }
    else {
      
      this.usernameEmpty = true;
    }
   
  }

  onUsernameBlur(event: any) {
    
    const value = event.target.value
    this.childOutput.emit(value);
    if(!value){
      this.usernameIsFocused = false;
    }
  }

  onPasswordBlur(event: any) {
    
    const value = event.target.value
    this.childOutput.emit(value);
    if(!value){
      this.passwordIsFocused = false;
    }
  }

  // engine function which will do all the works

 validator(id: any, serial: number, message: string)
 {
  console.log("VALIDATE")
  if (id.value.trim() === "") {
    this.errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid red";

    // icons
    this.failureIcon[serial].style.opacity = "1";
    this.successIcon[serial].style.opacity = "0";
  } else {
    this.errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";

    // icons
    this.failureIcon[serial].style.opacity = "0";
    this.successIcon[serial].style.opacity = "1";
  }
};

}
