import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  // selector: 'app-signup',   ako se pristupa preko routera ne treba selector!!!
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false; // definiranje spinerra

  constructor() { }

  ngOnInit() {
  }

  onSignup(signup: NgForm) {
    console.log(signup);
    console.log(signup.value);


  }

}
