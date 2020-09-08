import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // za  [(ngModel)] Template driven forme
import { ReactiveFormsModule } from "@angular/forms"; // za  [(ngModel)] Reactive driven forme
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";

// Ovdje dodajemo komponente
import { PostCreateEditTemplateFormComponent } from "./post/post-template-driven-form/post-create-edit-template-form.component";

import {PostReactiveComponent} from "./post/post-reactive-driven-form/post-reactive.component"
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostService } from "./post/post.service";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditTemplateFormComponent,
    PostReactiveComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // za router
    FormsModule, // za  [(ngModel)]
    BrowserAnimationsModule, // material
    MatInputModule, // omogučava nam pristup komponentama
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// MATERIAL
// ng add @angular/material@8.2.3 +
// ng add @angular/cdk@8.2.3 +

// deeppurple-amber.css
// indigo-pink.css
// pink-bluegrey.css
// purple-green.css
