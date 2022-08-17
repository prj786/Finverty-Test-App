import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddressComponent} from "./address/address.component";
import {ClientComponent} from "./client/client.component";
import {IdentityComponent} from "./identity/identity.component";

const routes: Routes = [
  {path: 'address', component: AddressComponent},
  {path: 'client', component: ClientComponent},
  {path: 'identity', component: IdentityComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientFormRoutingModule { }
