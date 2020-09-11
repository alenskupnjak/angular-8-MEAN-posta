import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // za  [(ngModel)] Template driven forme


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material-module';

@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,  // unog ngIF, ngFor..... mora biti
    MaterialModule, // material module se dupla
    FormsModule, // Template driven forme [(ngModel)]
  ]

})

export class AuthModule{}
