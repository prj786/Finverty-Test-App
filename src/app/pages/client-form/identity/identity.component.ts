import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {ClientFormService} from "../../../services/client-form.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientFormModel} from "../../../models/client-form";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'fin-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  clientInfo: ClientFormModel = {
    client: null,
    address: null,
    identity: null
  };

  identityForm: FormGroup = new FormGroup<any>({
    docType: new FormControl('', Validators.required),
    seriesNumber: new FormControl('', Validators.required),
    issuedBy: new FormControl(''),
    dateOfIssue: new FormControl('', Validators.required),
    file: new FormControl('')
  });

  docTypes: {name: string; value: string}[] = [
    {name: 'Passport', value: 'passport'},
    {name: 'Birth Certification', value: 'birthCertification'},
    {name: 'Driving License', value: 'drivingLicense'}
  ]

  constructor(private db: Firestore, private service: ClientFormService, private router: Router) { }

  ngOnInit(): void {
    this.service.clientForm$.asObservable().pipe().subscribe(res => {
      this.clientInfo = res;
      if (!res?.address) this.router.navigate(['/client-form/address']).finally();
      if (res?.identity) {
        this.identityForm.setValue(res.identity);
      }
    });
  }

  validator(field: string): boolean | undefined {
    return !this.identityForm.get(field)?.valid && this.identityForm.get(field)?.touched;
  }

  onUpload(ev: any): void {
    console.log(ev);
  }

  prevPage(): void {
    this.clientInfo = {...this.clientInfo, identity: this.identityForm.value};
    this.service.clientForm$.next(this.clientInfo);
    this.router.navigate(['client-form/address']).then();
  }

  submitForm(): void {
    this.clientInfo = {...this.clientInfo, identity: this.identityForm.value};
    const id = uuid.v4();
    setDoc(doc(this.db, 'client', id),
      {...this.clientInfo.address, ...this.clientInfo.client, ...this.clientInfo.identity}).then( _ => {
      this.router.navigate(['/client-form/client']).then(_ => {
        this.service.clientForm$.next({address: null, identity: null, client: null});
        Notify.success('Client Added Successfully!');
      });
    });
  }

}
