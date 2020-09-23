import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms"; // za Reactive driven forme
import { RouterModule } from '@angular/router';

import { MaterialModule } from "../material-module";
import { PostListComponent } from "./post-list/post-list.component";
import { PostReactiveComponent } from "./post-reactive-driven-form/post-reactive.component";

@NgModule({
  declarations: [PostListComponent, PostReactiveComponent],
  imports: [
    CommonModule, // zbog ngIF, ngFor..... mora biti
    MaterialModule, // material module se dupla
    FormsModule, // Template driven forme [(ngModel)]
    ReactiveFormsModule, // REACTIVE FORMS
    RouterModule  // za routing
  ],
})
export class PostModule {}
