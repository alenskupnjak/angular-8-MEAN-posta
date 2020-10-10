import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PostService } from "../post/post.service";
import { AuthServices } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // definiramo varijablu zbog memory leak-a...
  private postsSub: Subscription;
  private authLisenerSubs: Subscription;
  isLogin = false; // u startu nema logiranog usera
  private trenutniKorisnik: string;
  hostLink: string = "";
  vidi: any;
  most: string;

  constructor(
    public postService: PostService,
    private authServices: AuthServices
  ) {}

  ngOnInit() {
    this.isLogin = this.authServices.getIsAuth();

    if (this.authServices.trenutniKorisnik()) {
      this.hostLink = this.authServices.trenutniKorisnik().hostLink;
      this.trenutniKorisnik = this.authServices.trenutniKorisnik().usermail;
    }

    // ovo je za vjezbu ZAPAMTI OVO!!!!!!!
    this.postsSub = this.postService.getPostUpdateListener().subscribe(
      (data) => {
        console.log("Ja Header, sam cuo promjenu podataka u servisu!", data);
      },
      (err) => {
        console.log("********");
        this.isLogin = false;
        console.log(err);
      }
    );

    this.authLisenerSubs = this.authServices.getAuthStatusLisener().subscribe(
      (res) => {
        console.log("Header, cuo sam o promjeni podataka u Authservisu!", res);
        this.isLogin = res;
        this.hostLink = this.authServices.trenutniKorisnik().hostLink;
        this.trenutniKorisnik = this.authServices.trenutniKorisnik().usermail;
        console.log("this.trenutniKorisnik=", this.trenutniKorisnik);
        console.log("this.host=", this.hostLink);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //
  // Izlazak iz aplikacije, odlogiranjean, brise se token
  onLogout() {
    this.authServices.logout();
  }

  //
  // Brisanje svih subscribe()
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authLisenerSubs.unsubscribe();
  }
}
