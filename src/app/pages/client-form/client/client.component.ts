import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientFormService} from "../../../services/client-form.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {ClientFormModel} from "../../../models/client-form";
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Component({
  selector: 'fin-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  maxDate: Date = new Date();

  clientInfo: ClientFormModel = {
    client: null,
    address: null,
    identity: null
  };

  clientDetailsForm: FormGroup = new FormGroup<any>({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    gender: new FormControl(2),
    coordinator: new FormControl(2),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    clientGroup: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    preventSms: new FormControl(false)
  });

  genders: any[] = [
    {name: 'Male', value: 0},
    {name: 'Female', value: 1},
    {name: 'Other', value: 2}
  ];

  clientGroups: any[] = [
    {name: 'Vip Clients', value: 0},
    {name: 'Loyal Clients', value: 1},
    {name: 'New Clients', value: 2}
  ]

  coordinators: any[] = [
    {name: 'Jhones', value: 0},
    {name: 'Colinwood', value: 1},
    {name: 'Other', value: 2}
  ]

  constructor(private service: ClientFormService, private router: Router) { }

  ngOnInit(): void {
    this.service.clientForm$.asObservable().pipe(take(1)).subscribe(res => {
      if (!res) return;
      this.clientInfo = res;
      if (res.client) {
        this.clientDetailsForm.setValue(res.client);
      }
    })
  }


  // to shorten work time
  validator(field: string): boolean | undefined {
    return !this.clientDetailsForm.get(field)?.valid && this.clientDetailsForm.get(field)?.touched;
  }

  checkPrev(ev: any): void {
    this.clientDetailsForm.get('preventSms')?.setValue(ev.originalEvent.returnValue);
  }

  updateData(): void {
    this.clientInfo = {...this.clientInfo, client: this.clientDetailsForm.value};
    this.service.clientForm$.next(this.clientInfo);
  }

  nexStep(): void {
    this.updateData();
    this.router.navigate(['client-form/address']).then(_ => Notify.success('User Info Saved!'));
  }

  prevStep(): void {
    this.updateData();
    this.router.navigate(['']).then(_ => Notify.success('User Info Saved!'));
  }
}
