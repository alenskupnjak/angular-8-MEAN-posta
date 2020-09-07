import { Post } from "./post.model";
import { Subject } from "rxjs";

export class PostService {
  // osnovno polje iz kojeg vučemo podatke
  posts: Post[] = [];

  // OBSERVABLE  ---kojim cemo slati obavijest o promjeni podatka kroz program
  private postUpdated = new Subject<Post[]>();

  // dohvacanje svih podataka
  getPosts() {
    // uvijek radis kopiju polja
    return [...this.posts];
  }


  // OBSERVABLE - ova funkcija je triger na promjene u post podacima
  getPostUpdateListener() {
    // ako se mijenja vrijednost postupdate, salje signal
    return this.postUpdated.asObservable();
  }


  // dodavanje novog zapisa
  addPost(title: string, content: string) {
    const post: Post = {
      id:null,
      title: title,
      content: content,
    };
    this.posts.push(post);

    // šaljemo podatak u program sa next....
    this.postUpdated.next([...this.posts]);
  }
}
