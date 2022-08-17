import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientFormService} from "../../../services/client-form.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientFormModel} from "../../../models/client-form";
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Component({
  selector: 'fin-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();

  countryList: any[] = [];
  clientInfo: ClientFormModel = {
    client: null,
    address: null,
    identity: null
  };

  addressForm: FormGroup = new FormGroup<any>({
    index: new FormControl(''),
    country: new FormControl('', Validators.required),
    area: new FormControl(''),
    city: new FormControl('', Validators.required),
    street: new FormControl(''),
    house: new FormControl('')
  })


  constructor(private service: ClientFormService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.service.clientForm$.asObservable().subscribe(res => {
      this.clientInfo = {...res};
      if (!res?.client) {
        this.router.navigate(['/client-form/client']).finally();
        return;
      }
      if (res?.address) {
        this.addressForm.setValue(res.address);
      }
      this.getCountryList();
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  validator(field: string): boolean | undefined {
    return !this.addressForm.get(field)?.valid && this.addressForm.get(field)?.touched;
  }

  getCountryList(): void {
    this.service.getCountryList().subscribe(res => {
      this.countryList = res;
    })
  }

  updateData(): void {
    this.clientInfo = {...this.clientInfo, address: this.addressForm.value};
    this.service.clientForm$.next(this.clientInfo);
  }

  nexStep(): void {
    this.updateData();
    this.router.navigate(['client-form/identity']).then(_ => Notify.success('User Info Saved!'));
  }

  prevStep(): void {
    this.updateData();
    this.router.navigate(['client-form/client']).finally();
  }

}
