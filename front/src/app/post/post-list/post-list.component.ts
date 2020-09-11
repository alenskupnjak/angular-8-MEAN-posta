import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

// kreirane komponente
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { AuthServices } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  postaUlazna: Post[] = []; // property ... Prima podatke ....
  isLoading = false; // definiranje spinerra

  totalPost = 0; // paginacija ,ukupna duljina liste
  postPerPage = 10; // paginacija ,zapisa po stranici
  currentPage = 1; // paginacija, trenutna stranica
  pageSizeOptions = [1, 2, 5, 10, 30]; // definira koliko cemo max. prikazivati na stranici
  trenutnoLogiranKorisnikId: string;

  private postsSub: Subscription; // definiramo varijablu zbog memory leak-a...
  private authLisenerSubs: Subscription; // prati logiranje user
  isLogin = false; // u startu nema logiranog usera

  constructor(
    private postService: PostService,
    private authServices: AuthServices
  ) {}

  //
  // Inicijalizacija
  ngOnInit() {
    this.isLoading = true; // definiranje spinerra

    // trenutni korisnik
    this.trenutnoLogiranKorisnikId = this.authServices.trenutnoLogiranKorisnikId();

    // Povlačimo podatke iz baze
    this.postService.getPosts(this.postPerPage, this.currentPage);

    // OBSERVER- slušamo promjenu podataka
    this.postsSub = this.postService
      .getPostUpdateListener() // ovo predstavlja okidač za promjenu na ekranu
      .subscribe((data: { posts: Post[]; brojDokumenata: number }) => {
        // promjena vrijednosti postaUlazna koja je u HTML templatu
        // angular automatski renderira stranicu ponovo
        this.totalPost = data.brojDokumenata;
        this.postaUlazna = data.posts;
        this.isLoading = false; // definiranje spinerra
        this.trenutnoLogiranKorisnikId = this.authServices.trenutnoLogiranKorisnikId();
      });

    // provjeravamo da lj je korisnik logiran
    this.isLogin = this.authServices.getIsAuth();

    // OBSERVER - reagira samo na LOGIN i LOGOUT !!!
    this.authLisenerSubs = this.authServices
      .getAuthStatusLisener()
      .subscribe((res) => {
        console.log("Post-list, podatak promjenio u Authservisu... ", res);
        this.isLogin = res;
      });
  }

  //
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

  //
  // cuvamo od memory leak-a
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authLisenerSubs.unsubscribe();
  }
}
