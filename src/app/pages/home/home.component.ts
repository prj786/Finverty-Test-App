import {Component, OnDestroy, OnInit} from '@angular/core';
import {Firestore, collectionData, collection, deleteDoc, doc} from '@angular/fire/firestore';
import {Observable, Subject, takeUntil} from "rxjs";
import {ClientGroup, ClientModel} from "../../models/client.model";
import {ClientFormModel, ClientsMode} from "../../models/client-form";
import {ClientFormService} from "../../services/client-form.service";
import {Router} from "@angular/router";
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Component({
  selector: 'fin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  clientGroup: any = ClientGroup;
  subscriptionSubject$: Subject<any> = new Subject<any>();
  clients$: Observable<ClientsMode[]>;

  clients: ClientModel[] = [];
  loading: boolean = false;

  clientInfo: ClientFormModel = {
    client: null,
    address: null,
    identity: null
  }

  clientsCollection: any;

  constructor(private db: Firestore, private service: ClientFormService, private router: Router) {
    this.clientsCollection = collection(db, 'client');
    this.clients$ = collectionData(this.clientsCollection);
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptionSubject$.complete();
  }

  getData(): void {
    this.loading = true;
    this.clients$.pipe(takeUntil(this.subscriptionSubject$)).subscribe(res => {
      this.clients = res.map(item => {
        item.date = item.date.toDate();
        item.dateOfIssue = item.dateOfIssue.toDate();
        return item;
      });
      this.loading = false;
    });
    this.service.clientForm$.asObservable().pipe(takeUntil(this.subscriptionSubject$)).subscribe(res => {
      this.clientInfo = res;
    })
  }

  resetAndGo(): void {
    this.router.navigate(['/client-form/client'])
      .then(_ => {this.service.clientForm$.next({address: null, client: null, identity: null})});
  }

}
