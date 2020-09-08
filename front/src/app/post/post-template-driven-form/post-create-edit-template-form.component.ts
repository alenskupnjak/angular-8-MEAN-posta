import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create-edit",
  templateUrl: "./post-create-edit-template-form.component.html",
  styleUrls: ["./post-create-edit-template-form.component.css"],
})
export class PostCreateEditTemplateFormComponent implements OnInit {
  // property ...
  enteredTitle: string;
  enteredContent: string;
  isLoading = false; // definiranje spinerra
  post: Post; // mora biti javan podatak da bi ga vidio HTML
  private mode = "create";
  private postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  // inicijalizacija
  ngOnInit() {
    this.isLoading = true; // definiranje spinerra

    // provjera dali radi
    setTimeout(() => {
      // provjeravamo dal smo u edit modu ili create modu
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        // ParamMap ugradena angular funkcija za istrazivane ruotera...
        // ako je /posts/:postId  --> edit
        if (paramMap.has("postId")) {
          this.mode = "edit";
          this.postId = paramMap.get("postId");
          this.post = this.postService.getPost(this.postId);
        } else {
          this.mode = "create";
          this.postId = null;
        }
        this.isLoading = false;
      });
    }, 500);
  }

  // Dodavanje pošte ba listu
  onSavePost(postForm: NgForm) {
    this.isLoading = true; // definiranje spinerra
    // ako forma nije dobro popunjena vraćamo
    if (postForm.invalid) {
      return;
    }

    if (this.mode === "create") {
      // kreiramo zapis u program
      this.postService.addPost(postForm.value.title, postForm.value.content);
      this.isLoading = false; // definiranje spinerra
    } else {
      // update
      this.postService.updatePost(
        this.postId,
        postForm.value.title,
        postForm.value.content
      );
      this.isLoading = false; // definiranje spinerra
    }

    // cistimo podatke iz forme
    postForm.resetForm();
  }

    //Image filePicker
    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      // this.form.patchValue({ image: file });
      // this.form.get("image").updateValueAndValidity();
      console.log(file);
      // console.log(this.form);
    }
}
