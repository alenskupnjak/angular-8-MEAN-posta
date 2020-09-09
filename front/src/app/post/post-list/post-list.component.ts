import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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

  postaUlazna: Post[] = [];  // property ... Prima podatke ....
  isLoading = false; // definiranje spinerra

  totalPost = 0; // paginacija ,ukupna duljina liste
  postPerPage = 3;  // paginacija ,zapisa po stranici
  currentPage = 1; // trenutna stranica
  pageSizeOptions = [1, 2, 5, 10, 30]; // definira koliko cemo max. prikazivati na stranici

  private postsSub: Subscription; // definiramo varijablu zbog memory leak-a...

  // ISTO je pisati i:  constructor(public postService: PostService)
  postService: PostService;
  constructor(postService: PostService) {
    this.postService = postService;
  }
  ngOnInit() {
    this.isLoading = true; // definiranje spinerra

    // Povlačimo podatke iz baze
    this.postService.getPosts(this.postPerPage, this.currentPage);

    // OBSERVER- slušamo promjenu podataka
    this.postsSub = this.postService
      .getPostUpdateListener() // ovo predstavlja okidač za promjenu na ekranu
      .subscribe((data: { posts: Post[]; brojDokumenata: number }) => {
        console.log("data subscribe", data);

        // promjena vrijednosti postaUlazna koja je u HTML templatu
        // angular automatski renderira stranicu ponovo
        this.totalPost = data.brojDokumenata;
        this.postaUlazna = data.posts;
        this.isLoading = false; // definiranje spinerra
      });
  }

  // svaka promjena na paginatoru se reflektira
  onChangePage(pageData: PageEvent) {
    console.log("pageData==", pageData);
    this.isLoading = true; // definiranje spinerra
    this.postPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }

  //
  // Brišemo stranicu
  onDelete(id: string) {
    this.postService.postDelete(id);
  }

  // cuvamo od memory leak-a
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
