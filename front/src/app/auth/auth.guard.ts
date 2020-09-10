import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthServices } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authServices: AuthServices, private router: Router) {}

  // stitimo rutu ako korisnik nije logiran
  // ne moze se rucno upisati ruta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authServices.getIsAuth();
    // ako nije logiran usmjeravamo ga na Login stranicu
    if (!isAuth) {
      this.router.navigate(["/login"]);
    }
    return true;
  }
}
