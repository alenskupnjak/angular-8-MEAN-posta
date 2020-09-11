import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthServices } from "../auth.service";
import { Subscription } from "rxjs";

//TEMPLATE DRIVEN APPROACH
@Component({
  // selector: 'app-login',  ako se pristupa preko routera ne treba selector!!!
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false; // definiranje spinerra
  private authLisenerSubs: Subscription; // prati logiranje
  email: string;
  password: string;

  constructor(public authServices: AuthServices) {}

  ngOnInit() {
    this.authLisenerSubs = this.authServices.getAuthStatusLisener()
    .subscribe((res) => {
        // logiranje uspjelo ili ne TRUE / FALSE
        this.isLoading = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true; // definiranje spinerra
    this.authServices.loginUser(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authLisenerSubs.unsubscribe();
  }
}
