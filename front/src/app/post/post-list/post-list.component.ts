import { Component, OnInit, Input } from "@angular/core";
import { Post } from '../post.model'

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  // property ...

  // Prima podatke
  @Input() postaUlazna: Post [];
  panelOpenState: boolean;
  constructor() {}

  // methods....
  ngOnInit() {
    this.panelOpenState = false;

  }
}
