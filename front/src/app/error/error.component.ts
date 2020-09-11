import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"],
})
export class ErrorComponent implements OnInit {
  message = "Nepoznata greška";

  constructor(@Inject(MAT_DIALOG_DATA) public data: { poruka: string }) {}

  ngOnInit() {}
}
