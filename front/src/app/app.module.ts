// deeppurple-amber.css
// indigo-pink.css
// pink-bluegrey.css
// purple-green.css
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // za  [(ngModel)] Template driven forme
import { ReactiveFormsModule } from "@angular/forms"; // za Reactive driven forme
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from "./app.component";

// Ovdje dodajemo komponente
import { PostCreateEditTemplateFormComponent } from "./post/post-template-driven-form/post-create-edit-template-form.component";

import {PostReactiveComponent} from "./post/post-reactive-driven-form/post-reactive.component"
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostService } from "./post/post.service";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditTemplateFormComponent,
    PostReactiveComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // za router
    FormsModule, // Template driven forme [(ngModel)]
    BrowserAnimationsModule, // material
    MatInputModule, // omogučava nam pristup komponentama
    MatButtonModule, // material
    MatCardModule, // material
    MatToolbarModule, // material
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule, // material
    ReactiveFormsModule, // REACTIVE FORMS
    MatPaginatorModule  // material, paginacija
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}




