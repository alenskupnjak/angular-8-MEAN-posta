import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PostService } from "../post/post.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // definiramo varijablu zbog memory leak-a...
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
    // ovo je za vjezbu ZAPAMTI OVO!!!!!!!
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((data) => {
        console.log("Ja Header, sam cuo sam da se je podatak promjenio u servisu... :)",data);
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
