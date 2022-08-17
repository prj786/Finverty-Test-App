import {AddressModel} from "./address.model";
import {ClientModel} from "./client.model";
import {IdentityModel} from "./identity.model";

export interface ClientFormModel {
  address: AddressModel | null;
  client: ClientModel | null;
  identity: IdentityModel | null;
}

export interface ClientsMode extends ClientModel, AddressModel, IdentityModel {}
