import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  public errorMessages = {
    email:[
      {type: 'required', message:'email is required'},
      {type: 'pattern', message:'please enter a valid email address'}
    ],
    password:[
      {type: 'required', message:'password is required'},
      {type: 'minLength', message:'Incorrect password'}
    ]
  }

  registrationForm=this.formBuilder.group({
    email: ['', 
    [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$')
    ]
    ],
    password: ['',
    [
      Validators.required,
      Validators.minLength(8)
    ]
  ]
  })

  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public login(){
    if(this.registrationForm.valid){
    this.authService.login();
    }
  }
}
