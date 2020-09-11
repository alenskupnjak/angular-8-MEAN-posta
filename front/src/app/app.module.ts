import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // za  [(ngModel)] Template driven forme
import { ReactiveFormsModule } from "@angular/forms"; // za Reactive driven forme


// Ovdje dodajemo komponente
import { PostCreateEditTemplateFormComponent } from "./post/post-template-driven-form/post-create-edit-template-form.component";
import { AppComponent } from "./app.component";
import { PostReactiveComponent } from "./post/post-reactive-driven-form/post-reactive.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostService } from "./post/post.service";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { RouterModule } from '@angular/router';

import { ErrorComponent } from "./error/error.component";
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditTemplateFormComponent,
    PostReactiveComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // za router
    FormsModule, // Template driven forme [(ngModel)]
    BrowserAnimationsModule, // material
    ReactiveFormsModule, // REACTIVE FORMS
    HttpClientModule,
    MaterialModule
  ],
  providers: [
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
