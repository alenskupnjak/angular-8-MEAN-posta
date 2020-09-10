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
  trenutniKorisnik: string;

  constructor(
    public postService: PostService,
    private authServices: AuthServices
  ) {}

  ngOnInit() {
    this.isLogin = this.authServices.getIsAuth();
    // ovo je za vjezbu ZAPAMTI OVO!!!!!!!
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((data) => {
        console.log("Ja Header, sam cuo promjenu podataka u servisu!", data);
      });

    this.authLisenerSubs = this.authServices
      .getAuthStatusLisener()
      .subscribe((res) => {
        console.log("Header, cuo sam o promjeni podataka u Authservisu!", res);
        this.isLogin = res;
        this.trenutniKorisnik= this.authServices.trenutniKorisnik();
      });

      this.trenutniKorisnik= this.authServices.trenutniKorisnik();
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
