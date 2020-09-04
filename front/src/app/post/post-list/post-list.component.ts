import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  // property ... Prima podatke ....
  postaUlazna: Post[] = [];

  // definiramo varijablu zbog memory leak-a...
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  // methods....
  ngOnInit() {
    // u prvom prolazu dohvaca podatke ako ih ima
    this.postaUlazna = this.postService.getPosts();


    // TRIGGER - slušamo promjenu podataka
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.postaUlazna = posts;
      });
  }

  // cuvamo od memory leak-a
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
