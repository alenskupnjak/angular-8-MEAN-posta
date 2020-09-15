import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./post/post-list/post-list.component";
import { PostReactiveComponent } from "./post/post-reactive-driven-form/post-reactive.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  {
    path: "createRDF",
    component: PostReactiveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:postId",
    component: PostReactiveComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], // omogučavamo korištenje u cijelom programu
  providers: [AuthGuard], // obavezno ovdje dodajemo zastitu za rute ako to zelimo
})
export class AppRoutingModule {}
