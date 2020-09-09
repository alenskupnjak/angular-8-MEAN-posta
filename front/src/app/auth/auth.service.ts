import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data";

//
@Injectable({ providedIn: "root" })
export class AuthServices {
  constructor(private http: HttpClient, private router: Router) {}

  // SIGN UP - kreiramo user-a
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ user: AuthData }>(`${environment.path}/api/user/signup`, authData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  // SIGN UP - kreiramo user-a
  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.http
      .post(`${environment.path}/api/user/login`, user)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
