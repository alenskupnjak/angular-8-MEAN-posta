import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
// import { HttpClientModule } from '@angular/common/http';

@Injectable() // ovo mora biti za provider !!!!
export class PostService {
  // osnovno polje iz kojeg vučemo podatke
  private posts: Post[] = [];

  // OBSERVABLE  ---kojim cemo slati obavijest o promjeni podatka kroz program
  private postUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {}

  // povlačenje podataka sa mreže
  getPosts() {
    // uvijek radis kopiju polja
    // return [...this.posts];
    this.http
      // <{ definiramo ulazne vrijednosti kje ce biti kao objekt}>
      // posts je namjerno stavljen any da možemo transformirati _id u id.....
      .get<{ message: string; posts: any }>("http://localhost:4401/api/posts")

      // ovaj dio je visak jer se ID automatski povezuje sa _id
      .pipe(
        // map ekvivalentan map u JS, ali dolazi iz rxJS
        map((postData) => {
          console.log(postData);
          return postData.posts.map((data, index) => {
            return {
              title: data.title,
              content: data.content,
              id: data._id,
            };
          });
        })
      )
      .subscribe((dataPost) => {
        console.log(dataPost);

        this.posts = dataPost;
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
        this.getPosts();
      });
  }

  // brisanje zapisa iz baze
  postDelete(id: string) {
    console.log('  postDelete ID =', id);

    console.log(`http://localhost:4401/api/posts/${id}`);
    console.log('http://localhost:4401/api/posts/' + id);

    this.http
      .delete('http://localhost:4401/api/posts/' + id)
      .subscribe((data) => {
        console.log('Podatak obrisan');
        this.getPosts();
      });
  }
}
