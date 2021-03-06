import { NgModule } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    MatInputModule, // omogučava nam pristup komponentama
    MatButtonModule, // material
    MatCardModule, // material
    MatToolbarModule, // material
    MatExpansionModule,
    MatProgressSpinnerModule, // material
    MatPaginatorModule, // material, paginacija
    MatDialogModule, // dialog on ekranu
    MatIconModule // ikone
  ],
  exports: [
    MatInputModule, // omogučava nam pristup komponentama
    MatButtonModule, // material
    MatCardModule, // material
    MatToolbarModule, // material
    MatExpansionModule,
    MatProgressSpinnerModule, // material
    MatPaginatorModule, // material, paginacija
    MatDialogModule, // dialog on ekranu
    MatIconModule  // ikone
  ]

})
export class MaterialModule{}
