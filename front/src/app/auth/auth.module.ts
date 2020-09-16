import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; // za  [(ngModel)] Template driven forme

import { MaterialModule } from "../material-module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule, // zbog ngIF, ngFor..... mora biti
    MaterialModule, // material module se dupla
    FormsModule, // Template driven forme [(ngModel)]
  ],
})
export class AuthModule {}
