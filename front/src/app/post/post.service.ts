import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

import { Post } from "./post.model";

@Injectable() // ovo mora biti za provider !!!!
export class PostService {
  // osnovno polje iz kojeg vučemo podatke koji ce se prikazivati na ekranu
  private posts: Post[] = [];

  // podaci za paginaciju z cijeli servis
  totalPost;
  postPerPageServis = 5;
  currentPageServis = 1;

  // OBSERVABLE  ---kojim cemo slati obavijest o promjeni podatka kroz program
  private postUpdated = new Subject<{
    posts: Post[];
    brojDokumenata: number;
  }>();

  constructor(public http: HttpClient, private router: Router) {}

  // *********************************************
  // povlačenje podataka sa mreže
  getPosts(postPerPage: number, currentPage: number) {
    this.postPerPageServis = postPerPage;
    this.currentPageServis = currentPage;
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;

    this.http
      // <{ definiramo ulazne vrijednosti koje ce biti kao objekt}>
      // posts je namjerno stavljen any da možemo transformirati _id u id.....
      .get<{ message: string; posts: any; brojDokumenata: number }>(
        `${environment.path}/api/posts` + queryParams
      )
      // ovaj dio je visak jer se ID automatski povezuje sa _id
      .pipe(
        // map ekvivalentan map u JS, ali dolazi iz rxJS
        map((postData) => {
          // vračam objekt
          return {
            posts: postData.posts.map((data, index) => {
              return {
                title: data.title,
                content: data.content,
                id: data._id,
                imagePath: data.imagePath,
                creator: data.creator,
              };
            }),
            brojDokumenata: postData.brojDokumenata,
          };
        })
      )
      .subscribe(
        (dataPost) => {
          this.posts = dataPost.posts;
          // saljemo signap u program...
          this.postUpdated.next({
            posts: [...this.posts],
            brojDokumenata: dataPost.brojDokumenata,
          });
        },
        (error) => {
          //Error callback
          console.log(error, "error caught in component  xxxxxxxxx");
        }
      );
  }

  // *********************************************
  // OBSERVABLE - ova funkcija je triger na promjene u post podacima
  getPostUpdateListener() {
    // ako se mijenja vrijednost postupdate, salje signal
    return this.postUpdated.asObservable();
  }

  // *********************************************
  // dodavanje novog zapisa
  addPost(title: string, content: string, image: File) {
    // const post: Post = {
    //   id: null,
    //   title: title,
    //   content: content,
    // };
    const postData = new FormData(); // JS object
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http
      .post<{ message: string; podatak: Post }>(
        `${environment.path}/api/posts`,
        postData
      )
      .subscribe((data) => {
        console.log("data koji dobivam=", data);
        // let id = data.podatak._id;

        const post: Post = {
          id: data.podatak.id,
          title: title,
          content: content,
          imagePath: data.podatak.imagePath,
          creator: null,
        };
        console.log(data);

        this.posts.push(post);
        // šaljemo podatak u program sa next....
        this.postUpdated.next({ posts: [...this.posts], brojDokumenata: 1 });
        // this.getPosts(); staro rijesenje
        // vracamo na listu svih postova
        this.router.navigate(["/"]);
      });
  }

  // *****************************
  // dohvacanje jednog posta preko ID
  getPost(id: string) {
    return this.posts.find((data) => {
      return data.id === id;
    });
  }

  //*******************************
  // UPDATE post
  updatePost(id: string, title: string, content: string, image: any) {
    let postData: Post | FormData;
    // provjeravamo da lje podatak iz forme novi file slikama
    // ili je ostao stari link
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
      };
    }
    this.http
      .put(`${environment.path}/api/posts/` + id, postData)
      .subscribe((res) => {
        console.log("Updated", res);
        // vracamo na listu svih postova
        this.router.navigate(["/"]);
      });
  }

  // *****************************
  //
  // brisanje zapisa iz baze
  postDelete(id: string) {
    this.http
      .delete(`${environment.path}/api/posts/` + id)
      .subscribe((data) => {
        console.log("Podatak obrisan");
        // povlačim sve podatke
        this.getPosts(this.postPerPageServis, this.currentPageServis);
      });
  }
}
