import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss'],
})
export class SetPriceComponent {
  public featureForm: FormGroup;
  constructor(private form: FormBuilder) {}
  ngOnInit() {
    this.featureForm = this.form.group({
      productID: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      unit: ['', Validators.required],
      status: [false],
      entitlmentRange: ['', Validators.required],
      entitlmentName: ['', Validators.required],
      levels: this.form.array([]),
    });
  }
}
