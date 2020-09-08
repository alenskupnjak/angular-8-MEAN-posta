import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // za  [(ngModel)]
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

// Ovdje dodajemo komponente
import { PostCreateEditComponent } from "./post/post-create/post-create-edit.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostService } from "./post/post.service";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // za router
    FormsModule, // za  [(ngModel)]
    BrowserAnimationsModule, // material
    MatInputModule, // omogučava nam pristup komponentama
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
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
