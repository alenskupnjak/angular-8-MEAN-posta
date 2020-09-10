import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data";
import { Subject } from "rxjs";

//
@Injectable({ providedIn: "root" })
export class AuthServices {
  token: string;
  private authStatusLisener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusLisener(){
    return this.authStatusLisener.asObservable();
  }

  // SIGN UP - kreiramo user-a
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post(`${environment.path}/api/user/signup`, authData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  // SIGN UP - kreiramo user-a
  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string }>(`${environment.path}/api/user/login`, authData)
      .subscribe((res) => {
        const token = res.token;
        this.token = token;
        this.authStatusLisener.next(true);
        console.log(res);
      });
  }
}
