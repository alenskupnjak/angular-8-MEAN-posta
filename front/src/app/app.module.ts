import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms"; // za Reactive driven forme

// Ovdje dodajemo komponente
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PostService } from "./post/post.service";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";

import { ErrorComponent } from "./error/error.component";
import { MaterialModule } from "./material-module";
import { FooterComponent } from "./footer/footer.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

/// MODULI
// import { AuthModule } from "./auth/auth.module"; isklujčen zbog Layzi loadinga
import { PostModule } from "./post/post.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    FooterComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // za router
    // AuthModule,
    PostModule,
    BrowserAnimationsModule, // material
    ReactiveFormsModule, // REACTIVE FORMS
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],

  // entryComponents - se korist samo kada Ang-component nema selector i ne pristupa
  // se kroz router. Angular ne zna da ova komponenta postoji jer se kreira se u hodu (npr. dialog)
  entryComponents: [ErrorComponent],
})
export class AppModule {}

// deeppurple-amber.css
// indigo-pink.css
// pink-bluegrey.css
// purple-green.css
