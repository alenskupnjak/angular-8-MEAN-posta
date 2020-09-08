import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateEditComponent } from "./post/post-create/post-create-edit.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateEditComponent },
  { path: "edit/:postId", component:PostCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]  // omogučavamo korištenje u cijelom programu
})
export class AppRoutingModule {}
