import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthServices } from "../auth.service";

//TEMPLATE DRIVEN APPROACH
@Component({
  // selector: 'app-login',  ako se pristupa preko routera ne treba selector!!!
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading = false; // definiranje spinerra

  email: string;
  password: string;

  constructor(public authServices: AuthServices) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);

    this.authServices.loginUser(form.value.email, form.value.password);
  }
}
