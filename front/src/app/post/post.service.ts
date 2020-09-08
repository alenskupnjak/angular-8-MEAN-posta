import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable() // ovo mora biti za provider !!!!
export class PostService {
  // osnovno polje iz kojeg vučemo podatke koji ce se prikazivati na ekranu
  private posts: Post[] = [];

  // OBSERVABLE  ---kojim cemo slati obavijest o promjeni podatka kroz program
  private postUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient, private router: Router) {}

  //
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
              imagePath: data.imagePath,
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

  //
  // OBSERVABLE - ova funkcija je triger na promjene u post podacima
  getPostUpdateListener() {
    // ako se mijenja vrijednost postupdate, salje signal
    return this.postUpdated.asObservable();
  }

  //
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
        "http://localhost:4401/api/posts",
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
        };
        console.log(data);

        this.posts.push(post);
        // šaljemo podatak u program sa next....
        this.postUpdated.next([...this.posts]);
        // this.getPosts(); staro rijesenje
        // vracamo na listu svih postova
        this.router.navigate(["/"]);
      });
  }

  // dohvacane jednog posta preko ID
  getPost(id: string) {
    return this.posts.find((data) => {
      return data.id === id;
    });
  }

  // UPDATE post
  updatePost(id: string, title: string, content: string, image: any) {
    let postData: Post | FormData;
    console.log(typeof image === "object");

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
      };
    }
    this.http
      .put("http://localhost:4401/api/posts/" + id, postData)
      .subscribe((res) => {
        console.log("Update", res);
        // vracamo na listu svih postova
        this.router.navigate(["/"]);
      });
  }

  // brisanje zapisa iz baze
  postDelete(id: string) {
    console.log("  postDelete ID =", id);

    console.log(`http://localhost:4401/api/posts/${id}`);
    console.log("http://localhost:4401/api/posts/" + id);

    this.http
      .delete("http://localhost:4401/api/posts/" + id)
      .subscribe((data) => {
        console.log("Podatak obrisan");
        this.getPosts();
      });
  }
}
