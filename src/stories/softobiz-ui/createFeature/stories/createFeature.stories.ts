import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { createFeatureComponent } from '../createFeature.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';



// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<createFeatureComponent> = {
  component: createFeatureComponent,
  title: 'softobiz-ui/Pages/createFeature',
  tags: ['autodocs'],
  render: (args: createFeatureComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: { },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxTippyModule,
        SharedModule,
        RouterTestingModule,
      ],


    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="header-section pt-6 pb-6 pr-6 main-bg mb-11">
        <div class="flex align-center justify-between">
          <div class="flex align-center">
            <mat-icon
              class="material-symbols-outlined pointer"
              color="primary"
              >keyboard_backspace</mat-icon
            >
            <p class="fs-2xl fw-500 text-text text-dark">Create Feature</p>
          </div>
        </div>
      </div>
      <div class="form-with-sample flex border-2 w-full h-full overflow-auto px-6">
        <div class="form-left pt-10 px-10 pb-6 mr-6 border-2 main-bg">
          <div class="header-section">
            <h5 class="text-blue-darken mat-subtitle-1 font-weight-500">Features Details</h5>
          </div>
          <form [formGroup]="featureForm">
            <div class="form-container mt-6">
              <div class="input-wrapper">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                    Feature Name
                  </p>
                  <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                    [ngxTippy]="featureName" [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                  <ng-template #featureName let-name class="t-template">
                    <div class="help-info-tooltip">
                      <div class="heading-with-background">Feature name</div>
                      <div class="details">
                        Enter a name that helps you identify this Feature.
                      </div>
                      <button mat-button color="primary" class="px-0">
                        Learn more
                      </button>
                    </div>
                  </ng-template>
                </div>
                <mat-form-field appearance="outline" class="border-2">
                  <input required matInput placeholder="Enter here" formControlName="name" />
                  <mat-error *ngIf="
                      featureForm.controls['name'].invalid &&
                      featureForm.controls['name'].touched
                    ">
                    <ng-container *ngIf="featureForm.controls['name'].errors['required']">
                      Name is required and cannot be left empty.
                    </ng-container>
                    <ng-container *ngIf="featureForm.controls['name'].errors['maxlength']">
                      Name cannot exceed 20 characters.
                    </ng-container>
                    <ng-container *ngIf="featureForm.controls['name'].errors['pattern']">
                      Name cannot contain special characters.
                    </ng-container>
                  </mat-error>
                </mat-form-field>
              </div>
              <div class="input-wrapper">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                    Select Product
                  </p>
                  <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                    [ngxTippy]="selectProduct" [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                  <ng-template #selectProduct let-name class="t-template">
                    <div class="help-info-tooltip">
                      <div class="heading-with-background">Product</div>
                      <div class="details">
                        Please select a product to create a feature to it.
                      </div>
                      <button mat-button color="primary" class="px-0">
                        Learn more
                      </button>
                    </div>
                  </ng-template>
                </div>
                <mat-form-field appearance="outline" class="border-2">
                  <!-- <mat-label> Select </mat-label> -->
                  <mat-select required formControlName="productID" placeholder="select">
                    <mat-option *ngFor="let product of productArray" [value]="product">
                      {{ product }}
                    </mat-option>
      
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="input-wrapper">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">Feature ID</p>
                  <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                    [ngxTippy]="helpinfotooltip" [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                  <ng-template #helpinfotooltip let-name>
                    <div class="help-info-tooltip">
                      <div class="heading-with-background">Feature id</div>
                      <div class="details">
                        Please enter a Customized Id.If user do not enter this field,
                        the system will generate a 'Customized Human-Readable-id'
                        based on the Name field.
                        <div>
                          e.g. Feature Name: "Analytics Reporting" FeatureId:
                          "analytics-reporting-01".
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </div>
                <mat-form-field appearance="outline" class="border-2">
                  <input required matInput placeholder="Enter here" formControlName="featureId" />
                </mat-form-field>
              </div>
              <div class="input-wrapper">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                    Feature Type
                  </p>
                  <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary" [ngxTippy]="type"
                    [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                  <ng-template #type let-name class="t-template">
                    <div class="help-info-tooltip">
                      <div class="heading-with-background">Feature Type</div>
                      <div class="details">
                        Select how entitlements to this feature can be set in plans,
                        addons, and charges.
                      </div>
                      <button mat-button color="primary" class="px-0">
                        Learn more
                      </button>
                    </div>
                  </ng-template>
                </div>
                <mat-form-field appearance="outline" class="border-2">
                  <mat-select required formControlName="type" placeholder="select">
                    <mat-option *ngFor="let type of featureType" value="{{ type.title }}"
                      (click)="onTypeSelection(type.title)">
                      {{ type.title }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="input-wrapper">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                    Description
                  </p>
                </div>
                <mat-form-field appearance="outline" class="description-box">
                  <textarea rows="4" matInput placeholder="Enter here..." formControlName="description"></textarea>
                  <mat-error *ngIf="
                      featureForm.controls['description'].invalid &&
                      featureForm.controls['description'].touched
                    ">
                    <ng-container *ngIf="featureForm.controls['description'].errors['maxlength']">
                      Description cannot exceed 500 characters.
                    </ng-container>
                  </mat-error>
                </mat-form-field>
              </div>
              <div class="input-wrapper" *ngIf="
                  this.featureForm.value.type &&
                  this.featureForm.value.type != 1 &&
                  this.featureForm.value.type !== 'switch' &&
                  this.featureForm.value.type !== 'custom' 
      
                  || this.isRangeSelected
      
                ">
                <div class="flex align-center mb-2">
                  <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                    Entitlement Units
                  </p>
                  <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                    [ngxTippy]="selectProduct" [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                  <ng-template #selectProduct let-name class="t-template">
                    <div class="help-info-tooltip">
                      <div class="heading-with-background">Entitlement Units</div>
                      <div class="details">
                        Please select a product to create a feature to it.
                      </div>
                      <button mat-button color="primary" class="px-0">
                        Learn more
                      </button>
                    </div>
                  </ng-template>
                </div>
                <mat-form-field appearance="outline" class="border-2">
                  <input required matInput placeholder="Enter here" formControlName="unit" />
                </mat-form-field>
              </div>
              <div *ngIf="this.featureForm.value.unit || this.featureForm.value.type == 'custom'">
                <ng-container formArrayName="levels">
                  <ng-container *ngFor="let element of levels.controls; let i = index">
                    <div class="flex align-center wrap mb-3" [formGroupName]="i">
                      <div class="flex align-center wrap w-88">
                        <div class="input-wrapper pr-2">
                          <div class="flex align-center mb-2">
                            <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                              Entitlement
                            </p>
                          </div>
                          <mat-form-field appearance="outline" class="border-2">
                            <input (input)="setName(i)" required matInput placeholder="Enter here" formControlName="value" />
                          </mat-form-field>
                        </div>
                        <div class="input-wrapper">
                          <div class="flex align-center mb-2">
                            <p class="mat-subtitle-2 font-weight-500 input-label">
                              Display Name
                            </p>
                          </div>
                          <mat-form-field appearance="outline" class="border-2">
                            <input matInput placeholder="Enter here" formControlName="name" />
                          </mat-form-field>
                        </div>
                      </div>
                      <button *ngIf="i == 0" mat-stroked-button disableRipple
                        class="upper-case primary light medium px-1 ml-2">
                        Default
                      </button>
                      <button *ngIf="
                          levels.controls.length > 1 &&
                          i < levels.controls.length - 1 &&
                          i != 0
                        " mat-stroked-button disableRipple class="upper-case primary light medium px-1 ml-2"
                        (click)="deleteLevels(i)">
                        Remove
                      </button>
                      <button *ngIf="i == levels.controls.length - 1" mat-stroked-button disableRipple
                        class="upper-case primary light medium px-1 ml-2">
                        Maximum
                      </button>
                    </div>
                  </ng-container>
                </ng-container>
                <div>
                  <button mat-stroked-button (click)="toggleUnlimited()">
                    <mat-icon class="add-course-btn"></mat-icon>{{ unlimitedButtonLabel }}
                  </button>
                </div>
                <button mat-stroked-button (click)="addLevels()" *ngIf="!isRangeSelected">
                  <mat-icon class="add-course-btn"></mat-icon>Add Entitlement
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="sample-right h-auto">
          <div class="inner-block border-2 main-bg">
            <div class="header-section">
              <h5 class="text-blue-darken mat-subtitle-1 font-weight-500">Sample Feature</h5>
            </div>
            <div class="mt-4 mb-2">
              <div class="flex">
                <mat-icon class="material-symbols-outlined text-icon mr-2">
                  toggle_off
                </mat-icon>
                <h3 class="font-weight-500 mat-subtitle-2 text-blue-darken m-0">Switch Feature</h3>
              </div>
              <p class="mat-h4 text-grey-darken mb-3">
                This feature type has 2 entitlement levels- "available" and "not
                available".
              </p>
              <button mat-button color="primary" class="medium px-1 mb-3 font-weight-500">
                Try a Sample
              </button>
            </div>
            <div class="mb-2">
              <div class="flex">
                <mat-icon class="material-symbols-outlined text-icon mr-2">
                  arrow_range
                </mat-icon>
                <h3 class="font-weight-500 mat-subtitle-2 text-blue-darken m-0">Range Feature</h3>
              </div>
              <p class="mat-h4 text-grey-darken mb-3">
                This feature supports range based entitlements. For eg : Customer’s
                access can be between 100 and 300 API / minute.
              </p>
              <button mat-button color="primary" class="medium px-1 mb-3 font-weight-500">
                Try a Sample
              </button>
            </div>
            <div class="mb-2">
              <div class="flex">
                <mat-icon class="material-symbols-outlined text-icon mr-2">
                  production_quantity_limits
                </mat-icon>
                <h3 class="font-weight-500 mat-subtitle-2 text-blue-darken m-0">Quantity Feature</h3>
              </div>
              <p class="mat-h4 text-grey-darken mb-3">
                This feature type has numbered entitlement levels- For eg : 2,3,4 or
                10 user licenses.
              </p>
              <button mat-button color="primary" class="medium px-1 mb-3 font-weight-500">
                Try a Sample
              </button>
            </div>
            <div class="">
              <div class="flex">
                <mat-icon class="material-symbols-outlined text-icon mr-2">
                  tune
                </mat-icon>
                <h3 class="font-weight-500 mat-subtitle-2 text-blue-darken m-0">Custom Feature</h3>
              </div>
              <p class="mat-h4 text-grey-darken mb-3">
                This feature supports range based entitlements. For eg : Customer’s
                access can be between 100 and 300 API / minute.
              </p>
              <button mat-button color="primary" class="medium px-1 font-weight-500">
                Try a Sample
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-section pt-6 pb-6 pr-6 main-bg">
        <div class="action-btns flex align-center justify-between">
          <mat-checkbox
            color="primary"
            class="font-weight-500 checkbox ml-n-3"
            checked
            >Active</mat-checkbox
          >
          <div>
            <button
              mat-stroked-button
              color="primary"
              class="mr-2 large"
              [mat-dialog-close]="true"
            >
              Back
            </button>
            <button
              mat-flat-button
              color="primary"
              class="large"
              type="submit"
              [disabled]="
                !featureForm.valid &&
                !featureForm.get('productID')?.value &&
                this.featureForm.value.type !== 'switch' &&
                this.featureForm.value.type !== 'custom'
              "
            >
              Create
            </button>
          </div>
        </div>
      </div>
        `,
      },
    },
  },  
};

export default meta;
type Story = StoryObj<createFeatureComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const createFeature: Story = {
    args: {
    },
};

