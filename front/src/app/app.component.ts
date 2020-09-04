import { Component } from "@angular/core";
import { Post } from "./post/post.model";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular8";
  //  dodatkom [] definiramo da imamo polje takvih podataka
  svaPosta: Post [] = [];


  onPostAdded(event) {
    console.log("post=", event);
    this.svaPosta.push(event);
  }
}
