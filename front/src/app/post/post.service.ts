import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { HttpClientModule } from '@angular/common/http';

@Injectable() // ovo mora biti za provider !!!!
export class PostService {
  // osnovno polje iz kojeg vučemo podatke
  private posts: Post[] = [];

  // OBSERVABLE  ---kojim cemo slati obavijest o promjeni podatka kroz program
  private postUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {}

  // dohvacanje svih podataka
  getPosts() {
    // uvijek radis kopiju polja
    // return [...this.posts];
    this.http
      // <{ definiramo ulazne vrijednosti kje ce biti kao objekt}>
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:4401/api/posts"
      )
      .subscribe((dataPost) => {
        console.log(dataPost);
        this.posts = dataPost.posts;
        // saljemo signap u program...
        this.postUpdated.next([...this.posts]);
      });
  }

  // OBSERVABLE - ova funkcija je triger na promjene u post podacima
  getPostUpdateListener() {
    // ako se mijenja vrijednost postupdate, salje signal
    return this.postUpdated.asObservable();
  }

  // dodavanje novog zapisa
  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string }>("http://localhost:4401/api/posts", post)
      .subscribe((data) => {
        console.log(data.message);
        console.log(data);

        this.posts.push(post);
        // šaljemo podatak u program sa next....
        this.postUpdated.next([...this.posts]);
      });
  }
}
