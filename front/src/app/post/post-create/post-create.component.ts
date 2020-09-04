import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  // property name
  newPost = "Nema sadtzaja";
  enteredValue: string;

  constructor() {}

  // methods....
  onAddPost(postInput: HTMLTextAreaElement) {
    console.log(postInput);
    console.dir(postInput);
    console.log(this.enteredValue);
    this.newPost = postInput.value;
    setTimeout(() => {
      this.newPost = this.enteredValue;
    }, 3000);
  }

  ngOnInit() {}
}
