import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create-edit",
  templateUrl: "./post-reactive.component.html",
  styleUrls: ["./post-reactive.component.css"],
})
export class PostReactiveComponent implements OnInit {
  // property ...
  enteredTitle: string;
  enteredContent: string;
  isLoading = false; // definiranje spinerra
  post: Post; // mora biti javan podatak da bi ga vidio HTML
  private mode = "create";
  private postId: string;
  form: FormGroup; // definirana forma

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  // inicijalizacija
  ngOnInit() {
    this.isLoading = true; // definiranje spinerra

    // provjera dali radi
    setTimeout(() => {
      // kreiramo formu
      this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        content: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        // [image] necemo sinhronizirati sa stranicom, to nije nužno
        image: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
      });

      // provjeravamo dal smo u EDIT ili CREATE modu
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        // ParamMap ugradena angular funkcija za istrazivane ruotera...
        // ako je /posts/:postId  --> edit
        if (paramMap.has("postId")) {
          this.mode = "edit";
          this.postId = paramMap.get("postId");
          this.post = this.postService.getPost(this.postId);
          // inicijaliziramo vrijednosti u formi
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        } else {
          this.mode = "create";
          this.postId = null;
        }
        this.isLoading = false;
      });
    }, 500);
  }

  // Dodavanje pošte ba listu
  onSavePost() {
    this.isLoading = true; // definiranje spinerra
    // ako forma nije dobro popunjena vraćamo
    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
      // kreiramo zapis u program
      this.postService.addPost(this.form.value.title, this.form.value.content);
      this.isLoading = false; // definiranje spinerra
    } else {
      // update
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
      this.isLoading = false; // definiranje spinerra
    }
    this.form.reset(); // reset forme
  }

  // Dodavanje
  //Image filePicker
  onImagePicked(event: Event) {
    // file object
    const file = (event.target as HTMLInputElement).files[0];
    // tergetira single control value i mijenja ga samo za reaktivne forme u definicije forme
    this.form.patchValue({ image: file });
    // obavijes angular da updatura formu, salje obavijest da su podaci mijenjanjji
    this.form.get("image").updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }
}

// Whereas ReactiveFormsModule gives us reactive driven directives like
// 	formControl and
//  ngFormGroup
