import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  // property ...
  enteredTitle: string;
  enteredContent: string;
  post: Post; // mora biti javan podatak da bi ga vidio HTML
  private mode = "create";
  private postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    // provjeravamo dal smo u edit modu ili create modu
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // ParamMap ugradena angular funkcija za istrazivane ruotera...
      console.log(paramMap);

      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  // methods....
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    // saljemo zapis u program
    this.postService.addPost(postForm.value.title, postForm.value.content);

    // cistimo podatke iz forme
    postForm.resetForm();
  }
}
