import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model'

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  // property ...
  enteredTitle: string;
  enteredContent: string;

  // šalje podatak u program  <app-post-create .....> Samo tamo se može slati podatak
  @Output() postaOdlazna = new EventEmitter<Post>();

  constructor() {}

  // methods....
  onAddPost() {
    // kreiramo zapis koji cemo poslati u listu
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };

    // saljemo zapis u program
    this.postaOdlazna.emit(post);
  }

  ngOnInit() {}
}
