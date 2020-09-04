import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model'
import { NgForm } from '@angular/forms';

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
  onAddPost(postForm:NgForm) {

    if (postForm.invalid) {
      return;
    }

    console.log(postForm);

    // kreiramo zapis koji cemo poslati u listu
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content,
    };

    // saljemo zapis u program
    this.postaOdlazna.emit(post);
  }

  ngOnInit() {}
}
