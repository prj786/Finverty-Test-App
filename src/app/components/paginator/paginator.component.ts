import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fin-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() nextStepTitle: "Next" | "Finish" = "Next";
  @Input() prevStepTitle: "Prev" | "Back" = "Prev";
  @Input() valid: boolean = true;
  @Input() step: 0 | 1 | 2 = 0;

  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() prevStep: EventEmitter<any> = new EventEmitter<any>();

  info: { prevRoute: string; nextRoute: string } = {
      prevRoute: 'Home',
      nextRoute: 'Client Address'
  }

  constructor() { }

  ngOnInit(): void {
    switch (this.step) {
      case 1:
        this.info = {
          prevRoute: 'Client Form',
          nextRoute: 'Client Identity'
        }
      break;
      case 2:
        this.info = {
          prevRoute: 'Client Address',
          nextRoute: 'Save The Form!'
        }
      break;
    }
  }

}
