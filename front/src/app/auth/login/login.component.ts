import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";


//TEMPLATE DRIVEN APPROACH
@Component({
  // selector: 'app-login',  ako se pristupa preko routera ne treba selector!!!
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoading = false; // definiranje spinerra

  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
    this.email ='alenskupnaj'
    this.password = '1122'
  }

  onSavePost(postForm: NgForm) {

  }

}
