import { Component, OnInit, OnDestroy } from "@angular/core";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from "rxjs";

// kreirane komponente
import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  // property ... Prima podatke ....
  postaUlazna: Post[] = [];
  isLoading = false; // definiranje spinerra

  // varijeble paginacije
  totalPost = 5;
  postPerPage = 3;
  pageSizeOptions = [1, 2, 5, 10];

  // definiramo varijablu zbog memory leak-a...
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  // methods....
  ngOnInit() {
    this.isLoading = true; // definiranje spinerra

    // u prvom prolazu dohvaca podatke ako ih ima
    // this.postaUlazna = this.postService.getPosts(); // verzija 1
    this.postService.getPosts();

    // OBSERVER- slušamo promjenu podataka
    this.postsSub = this.postService
      .getPostUpdateListener() // ovo predstavlja okidač za promjenu na ekranu
      .subscribe((posts: Post[]) => {
        // promjena ceijednosti postaUlazna koja je u HTML templatu
        // angular automatski renderira stranicu ponovo
        this.postaUlazna = posts;
      });
    this.isLoading = false;
  }

  onChangePage(pageData :PageEvent) {
    console.log(pageData);


  }

  onDelete(id: string) {
    this.postService.postDelete(id);
  }

  // cuvamo od memory leak-a
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
