import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errormessage = "Dogodila se greška prilikom pokušaja spajanja na bazu.";
        if (error.error.message) {
          errormessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { poruka: errormessage } });
        console.log("intercept error", error);
        return throwError(error);
      })
    );
  }
}
