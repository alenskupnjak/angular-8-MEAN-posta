import { Component, isDevMode, OnInit } from "@angular/core";
import { AuthServices } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authServices: AuthServices) {}
  ngOnInit() {
    if (isDevMode()) {
      console.log("Development Mode!");
    } else {
      console.log("Cool. Production!");
    }

    this.authServices.autoAuthUser();
  }
  title = "angular8";
}
