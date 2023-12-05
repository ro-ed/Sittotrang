import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() label: string;
  @Input() type = 'text'; //set default type to be text
  //@Input() username: string;
  //@Input() password: string;

  username: string;
  password: string;

  @Input() name = 'name'; //default set to name.
  @Input() icon: string;
  svg: any;
  focused: boolean;
  usernameIsFocused: boolean;
  passwordIsFocused: boolean;
  usernameEmpty: boolean;
  rememberCredentials: boolean;
  @Output() childOutput: EventEmitter<string> = new EventEmitter();

  errorMsg: any;

  successIcon: any;
  failureIcon: any;
  usernameIcon: any;
  passwordIcon: any;

  isCorrectUsernameFormat: boolean;
  isWrongPassword: boolean;

  constructor(private router: Router, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    let id = (id: any) => document.getElementById(id);

    let classes = (classes: any) => document.getElementsByClassName(classes);

    let username = id('username'),
      email = id('email'),
      password = id('password'),
      form = id('form');

    (this.errorMsg = classes('error')),
      (this.successIcon = classes('success-icon')),
      (this.failureIcon = classes('failure-icon'));

    // Adding the submit event Listener

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      this.validator(username, 0, 'Username cannot be blank');
      this.validator(email, 1, 'Email cannot be blank');
      this.validator(password, 2, 'Password cannot be blank');
    });

    //ICONS FROM BOOTSTRAP
    var iconArray = {
      user: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </svg>`,

      password: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
     <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
   </svg>`,

      failure: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>`,

      success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`,
    } as any;
    //console.log(iconArray)

    Object.keys(iconArray).forEach((key) => {
      switch (key) {
        case 'user':
          this.usernameIcon = this.domSanitizer.bypassSecurityTrustHtml(
            iconArray[key]
          );
          break;
        case 'password':
          this.passwordIcon = this.domSanitizer.bypassSecurityTrustHtml(
            iconArray[key]
          );
          break;
        case 'failure':
          this.failureIcon = this.domSanitizer.bypassSecurityTrustHtml(
            iconArray[key]
          );
          break;
        case 'success':
          this.successIcon = this.domSanitizer.bypassSecurityTrustHtml(
            iconArray[key]
          );
          break;
      }
    });

    if (
      localStorage.getItem('username') &&
      localStorage.getItem('password') !== ''
    ) {
      //let username = document.getElementById("username") as HTMLInputElement;
      this.username = localStorage.getItem('username') as string;
      //console.log("USERNAME SET", this.username)
      this.usernameIsFocused = true;
      this.validateEmail(this.username);

      //let password = document.getElementById("password") as HTMLInputElement;
      this.password = localStorage.getItem('password') as string;
      //console.log("PASSWORD SET", this.password)
      this.passwordIsFocused = true;
    }

    if (localStorage.getItem('rememberCredentials') === 'true') {
      this.rememberCredentials = true;
    }
  }

  hasCheckedRemeberCredentials() {
    let inputBox = document.getElementById(
      'rememberCredentialsId'
    ) as HTMLInputElement;
    if (inputBox.checked === true) {
      localStorage.setItem('rememberCredentials', 'true');
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.rememberCredentials = true;
    } else {
      localStorage.setItem('rememberCredentials', 'false');
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
      this.rememberCredentials = false;
    }
  }

  validateEmail(email: string) {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      //console.log("TRUE")
      this.isCorrectUsernameFormat = true;
      let usernameInput = document.getElementById(
        'username'
      ) as HTMLInputElement;
      usernameInput.style.borderColor = 'green';
    } else {
      //console.log("FALSE")
      this.isCorrectUsernameFormat = false;
      let usernameInput = document.getElementById(
        'username'
      ) as HTMLInputElement;
      usernameInput.style.borderColor = 'red';
    }
  }

  onEmailEntry() {}

  onPasswordEntry() {}

  onLogin(e: any) {
    e.preventDefault();
  }

  login(e: any) {
    e.preventDefault();
    let username = document.getElementById('username') as HTMLInputElement;
    //console.log("USRNAME", username.value)
    let password = document.getElementById('password') as HTMLInputElement;
    //console.log("PASS", password.value)
    if (username.value === 'robin@sittotrang.se' && password.value === '123') {
      if (this.rememberCredentials) {
        localStorage.setItem('username', username.value);
        localStorage.setItem('password', password.value);
      }
      this.router.navigate(['home']);
    } else {
      if (!this.isCorrectUsernameFormat) {
        let usernameDesign = document.getElementById('username') as HTMLElement;
        usernameDesign.style.border = '2px solid red';
      }
      let passwordDesign = document.getElementById('password') as HTMLElement;
      passwordDesign.style.border = '2px solid red';
      this.isWrongPassword = true;
    }
  }

  onUsernameBlur(event: any) {
    const value = event.target.value;
    this.childOutput.emit(value);
    if (!value) {
      this.usernameIsFocused = false;
    }
  }

  onPasswordBlur(event: any) {
    const value = event.target.value;
    this.childOutput.emit(value);
    if (!value) {
      this.passwordIsFocused = false;
    }
  }

  // engine function which will do all the works

  validator(id: any, serial: number, message: string) {
    console.log('VALIDATE');
    if (id.value.trim() === '') {
      this.errorMsg[serial].innerHTML = message;
      id.style.border = '2px solid red';

      // icons
      this.failureIcon[serial].style.opacity = '1';
      this.successIcon[serial].style.opacity = '0';
    } else {
      this.errorMsg[serial].innerHTML = '';
      id.style.border = '2px solid green';

      // icons
      this.failureIcon[serial].style.opacity = '0';
      this.successIcon[serial].style.opacity = '1';
    }
  }

  flipCard() {
    const card = document.getElementById('card') as HTMLElement;
    card.classList.toggle('flip');

    const loginCard = document.querySelector('.login-card') as HTMLElement;
    const signupCard = document.querySelector('.signup-card') as HTMLElement;

    if (card.classList.contains('flip')) {
      setTimeout(() => {
        loginCard.style.visibility = 'hidden';
        loginCard.style.opacity = '0';
        signupCard.style.visibility = 'visible';
        signupCard.style.opacity = '1';
      }, 250); // Adjust the timeout based on your transition duration
    } else {
      setTimeout(() => {
        loginCard.style.visibility = 'visible';
        loginCard.style.opacity = '1';
        signupCard.style.visibility = 'hidden';
        signupCard.style.opacity = '0';
      }, 250); // Adjust the timeout based on your transition duration
    }
  }
}
