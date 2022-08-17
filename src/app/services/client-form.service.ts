import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClientFormModel} from "../models/client-form";

@Injectable({
  providedIn: 'root'
})
export class ClientFormService {
  clientForm$: BehaviorSubject<ClientFormModel> = new BehaviorSubject<ClientFormModel>({address: null, client: null, identity: null});

  constructor(private http: HttpClient) { }

  getCountryList(): Observable<any> {
    return this.http.get('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json');
  }

}
