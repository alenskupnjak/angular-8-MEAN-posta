import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule } from "@angular/forms"; // za  [(ngModel)]

import { AppComponent } from "./app.component";

// Ovdje dodajemo komponente
import { PostCreateComponent } from "./post/post-create/post-create.component";

@NgModule({
  declarations: [AppComponent, PostCreateComponent],
  imports: [
    BrowserModule,
    FormsModule, // za  [(ngModel)]
    BrowserAnimationsModule, // material
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}



// MATERIAL
// ng add @angular/material@x.x.x. +
// ng add @angular/cdk@x.x.x. +

// u angular.json treba biti ubacena tema
// "styles": [
//   {
//     "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
//   }

// index.html
// <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">

