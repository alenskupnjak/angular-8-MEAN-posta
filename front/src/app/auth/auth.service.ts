import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data";
//
@Injectable({ providedIn: "root" })
export class AuthServices {
  private isLogin = false;
  token: string;
  private authStatusLisener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  // definira status logiranja: TRUE ili FALSE
  getIsAuth() {
    return this.isLogin;
  }

  getAuthStatusLisener() {
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
        if (token) {
          // ovdje spremam informaciju za nerenderirane stranice nakon LOGINA
          this.isLogin = true;

          // ovo se aktivira samo kod LOGIN i LOGOUT.
          // saljem podatke svim componentama  koje su AKTIVNE!! da je neko logiran
          this.authStatusLisener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  //
  // Logout
  logout(){
    this.token = null;
    this.isLogin = false;
    // saljam signal u header da sam odlogiran
    this.authStatusLisener.next(false);
    this.router.navigate(['/']);
  }
}
