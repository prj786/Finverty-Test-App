import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {IdentityComponent} from "./identity/identity.component";
import {ClientFormRoutingModule} from "./client-form-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../components/shared.module";
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {MessageModule} from "primeng/message";
import {FileUploadModule} from "primeng/fileupload";
import {TooltipModule} from "primeng/tooltip";



@NgModule({
  declarations: [
    ClientComponent,
    AddressComponent,
    IdentityComponent
  ],
  imports: [
    CommonModule,
    ClientFormRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    SharedModule,
    CheckboxModule,
    DividerModule,
    MessageModule,
    FileUploadModule,
    TooltipModule
  ]
})
export class ClientFormModule { }
