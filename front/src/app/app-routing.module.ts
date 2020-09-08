import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateEditReactiveComponent } from "./post/post-reactive-driven-form/post-create-edit.component";
import { PostCreateEditTemplateFormComponent } from "./post/post-template-driven-form/post-create-edit-template-form.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "createTDF", component:PostCreateEditTemplateFormComponent },
  { path: "createRDF", component:PostCreateEditReactiveComponent },
  { path: "edit/:postId", component:PostCreateEditTemplateFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]  // omogučavamo korištenje u cijelom programu
})
export class AppRoutingModule {}
