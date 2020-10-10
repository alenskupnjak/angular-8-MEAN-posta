import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data";

@Injectable({ providedIn: "root" })
export class AuthServices {
  private isLogin = false; // korisnik logiran TRUE/FALSE
  private token: string;
  private userIdTrenutnoLogiran: string;
  private userEmail: string;
  private tokenTimer: any;
  private hostLink: string;
  private podatak: any;
  // registrira radnju LOGIN i LOGOUT
  private authStatusLisener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  // definira status logiranja: TRUE ili FALSE
  getIsAuth() {
    return this.isLogin;
  }

  trenutniKorisnik() {
    this.podatak = {
      usermail: this.userEmail,
      hostLink: this.hostLink,
    };
    return this.podatak;
  }

  // definira status logiranja: TRUE ili FALSE
  trenutnoLogiranKorisnikId() {
    return this.userIdTrenutnoLogiran;
  }

  getAuthStatusLisener() {
    return this.authStatusLisener.asObservable();
  }

  // *****************************
  // SIGN UP - kreiramo user-a
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http.post(`${environment.path}/api/user/signup`, authData).subscribe(
      (res) => {
        console.log("Kreiranje usera JE uspjelo");
        this.router.navigate(["/login"]);
      },
      (err) => {
        this.authStatusLisener.next(false);
        console.log("Kreiranje usera nije uspjelo");
      }
    );
  }

  // **************************************
  // SIGN UP - kreiramo user-a
  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        loginUser: string;
        loginUserName: string;
        hostLink: string;
      }>(`${environment.path}/api/user/login`, authData)
      .subscribe(
        (res) => {
          const token = res.token;
          this.token = token;
          if (token) {
            // vrijednost u sekunadama
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            // ovdje spremam informaciju za nerenderirane stranice nakon LOGINA
            this.isLogin = true;

            // trenutno logiran korisnik
            this.userIdTrenutnoLogiran = res.loginUser;
            this.userEmail = res.loginUserName;
            this.hostLink = res.hostLink;
            console.log("res.host= qqqqq", res.hostLink);

            // ovo se aktivira samo kod LOGIN i LOGOUT.
            // saljem podatke svim componentama  koje su AKTIVNE!! da je neko logiran
            this.authStatusLisener.next(true);

            // snimamo token i expiredtime u LOCALSTORAGE
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );

            // snimanje podataka u localStorage
            this.saveAuthData(
              token,
              expirationDate,
              this.userIdTrenutnoLogiran,
              this.userEmail,
              this.hostLink
            );
            this.router.navigate(["/"]);
          }
        },
        (err) => {
          console.log("Neuspjela autorizacija");
          this.authStatusLisener.next(false);
        }
      );
  }

  // *****************************
  // Logout
  logout() {
    this.token = null;
    this.hostLink = null;

    this.isLogin = false;
    this.userIdTrenutnoLogiran = null;
    // saljam signal u header da sam odlogiran
    this.authStatusLisener.next(false);
    this.router.navigate(["/"]);
    // brisem timer koji sam postavio da nakon expiresInDuration se odlogira
    clearTimeout(this.tokenTimer);
    this.clearAuthData(); // brisanje localstorage
  }

  // *************************************************
  // snimanjepodataka u local storage
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userID: string,
    email: string,
    hostLink: string
  ) {
    localStorage.setItem("hostPostaAngular", hostLink);
    localStorage.setItem("tokenPostaAngular", token);
    localStorage.setItem("emailPostaAngular", email);
    localStorage.setItem(
      "expirationPostaAmgular",
      expirationDate.toISOString()
    );
    localStorage.setItem("userIdPostaAngular", userID);
  }

  private clearAuthData() {
    localStorage.removeItem("tokenPostaAngular");
    localStorage.removeItem("expirationPostaAmgular");
    localStorage.removeItem("userIdPostaAngular");
    localStorage.removeItem("emailPostaAngular");
    localStorage.removeItem("hostPostaAngular");
  }

  //
  // provjeravamo da li korisnik vec logiran
  autoAuthUser() {
    const authInformation = this.getAuthData();
    // ako nema zapisa izbacujemo iz autentifikacije
    if (!authInformation) {
      return;
    }
    // provjeravamo dali je token istekao
    const expiresIn =
      authInformation.expirationDate.getTime() - new Date().getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isLogin = true;
      this.setAuthTimer(expiresIn / 1000);
      this.userIdTrenutnoLogiran = authInformation.userId;
      this.userEmail = authInformation.email;
      this.hostLink = authInformation.hostLink;
      this.authStatusLisener.next(true);
    }
  }

  // vrijeme u sekunadama
  private setAuthTimer(duration: number) {
    console.log("Seting timer (sec)= " + duration);

    // nakon sto protekne vrijeme (expiresInDuration), automatski odlogira korisnika
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // milisekunde
  }

  private getAuthData() {
    const token = localStorage.getItem("tokenPostaAngular");
    const expirationDate = localStorage.getItem("expirationPostaAmgular");
    const userId = localStorage.getItem("userIdPostaAngular");
    const email = localStorage.getItem("emailPostaAngular");
    const hostLink = localStorage.getItem("hostPostaAngular");
    if (!token || !expirationDate || !userId) {
      return;
    }
    // ako zapisi postoje vracam zapis
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      email: email,
      hostLink: hostLink,
    };
  }
}
