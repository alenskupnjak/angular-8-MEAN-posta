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
  isLogin = false;  // u startu nema logiranog usera

  constructor(
    public postService: PostService,
    private authServices: AuthServices
  ) {}

  ngOnInit() {
    // ovo je za vjezbu ZAPAMTI OVO!!!!!!!
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((data) => {
        console.log(
          "Ja Header, sam cuo sam da se je podatak promjenio u servisu... :)",
          data
        );
      });

    this.authLisenerSubs = this.authServices
      .getAuthStatusLisener()
      .subscribe((res) => {
        console.log(
          "Ja Header, sam cuo sam da se je podatak promjenio u Authservisu... ",
          res
        );
        this.isLogin = res;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authLisenerSubs.unsubscribe();
  }
}
