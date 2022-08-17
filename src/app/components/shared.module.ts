import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorComponent} from "./paginator/paginator.component";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    PaginatorComponent,
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class SharedModule { }
