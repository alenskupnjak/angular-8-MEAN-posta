import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data";

//
@Injectable({ providedIn: "root" })
export class AuthServices {
  constructor(private http: HttpClient, private router: Router) {}

  // kreiramo user-a
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post<{ user: AuthData }>(`${environment.path}/api/user/signup`, authData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
