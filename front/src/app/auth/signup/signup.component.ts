import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthServices } from "../auth.service";

@Component({
  // selector: 'app-signup',   ako se pristupa preko routera ne treba selector!!!
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  isLoading = false; // definiranje spinerra

  constructor(public authServices: AuthServices) {}

  ngOnInit() {}

  onSignup(signup: NgForm) {
    if (signup.invalid) {
      return;
    }
    this.authServices.createUser(signup.value.email, signup.value.password);
  }
}
