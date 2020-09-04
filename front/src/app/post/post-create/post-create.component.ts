import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  // property ...
  enteredTitle: string;
  enteredContent: string;

  constructor(public postService: PostService) {}

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

  ngOnInit() {}
}
