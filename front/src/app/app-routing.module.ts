import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostReactiveComponent } from "./post/post-reactive-driven-form/post-reactive.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], // omogučavamo korištenje u cijelom programu
  providers: [AuthGuard], // obavezno ovdije dodajemo zaszizi
})

export class AppRoutingModule {}
