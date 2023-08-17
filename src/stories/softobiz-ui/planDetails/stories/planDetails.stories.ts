import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { planDetailsComponent } from '../planDetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<planDetailsComponent> = {
  component: planDetailsComponent,
  title: 'softobiz-ui/Pages/planDetails',
  tags: ['autodocs'],
  render: (args: planDetailsComponent) => ({
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
        RouterTestingModule
      ],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="flex w-full mt-11">
        <div #contentSection class="create-plan-main-wrapper h-full relative">
          <div class="flex align-center justify-between mb-6">
            <div class="flex align-center">
              <mat-icon class="material-symbols-outlined pointer mr-2" color="primary"
                [routerLink]="'/plan'">keyboard_backspace</mat-icon>
              <p class="fs-2xl fw-500 text-purple-lighten-1">Create Plan</p>
            </div>
          </div>
          <div #step1 id="step1" class="plan-section-block flex-center p-10 mb-4 border-2">
            <div class="plan-info-block inner-wrapper">
              <div class="heading">
                <abbr class="mat-headline-5 text-blue-darken">Plan Details</abbr>
                <p class="text-grey-darken mt-1">Add plan details here</p>
              </div>
              <form [formGroup]="planForm">
                <div class="info-form">
                  <div class="input-wrapper mt-5">
                    <div>
                      <div class="flex align-center mb-2">
                        <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                          Plan Id
                        </p>
                        <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                          [ngxTippy]="helpinfotooltip"
                          [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                        <ng-template #helpinfotooltip let-name>
                          <div class="help-info-tooltip">
                            <div class="heading-with-background text-blue-darken font-weight-500">Plan id</div>
                            <div class="details">
                              <p class="text-grey-darken">
                                Enter a Customized Id. If user do not enter this field, the system will generate a ‘Customized
                                Human-Readable-id’ based on the Name fielde.g. Plan id Name: “Karisch plus Enterprise”Plan Id:
                                “karish-plus-enteprise-01”
                              </p>
                            </div>
                            <button mat-button color="primary" class="px-0">
                              Learn more
                            </button>
                          </div>
                        </ng-template>
                      </div>
                      <mat-form-field appearance="outline">
                        <input *ngIf="!editable" required matInput placeholder="Enter here..." formControlName="planId" />
                        <input *ngIf="editable" readonly required matInput placeholder="Enter here..."
                          formControlName="planId" />
                      </mat-form-field>
                    </div>
                    <div>
                      <div class="flex align-center mb-2">
                        <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                          Plan Name (External)
                        </p>
                        <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                          [ngxTippy]="productnameinfo"
                          [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                        <ng-template #productnameinfo let-name class="t-template">
                          <div class="help-info-tooltip">
                            <div class="heading-with-background text-blue-darken font-weight-500">
                              Plan name (External)
                            </div>
                            <div class="details">
                              <p class="text-grey-darken">
                                This name will be shown on the customer portal.
                              </p>
                            </div>
                            <button mat-button color="primary" class="px-0">
                              Learn more
                            </button>
                          </div>
                        </ng-template>
                      </div>
                      <mat-form-field appearance="outline">
                        <input required matInput placeholder="Enter here..." formControlName="externalName" />
                        <mat-error *ngIf="
                            planForm.controls['externalName'].invalid &&
                            planForm.controls['externalName'].touched
                          ">
                          <ng-container *ngIf="
                              planForm.controls['externalName'].errors['required']
                            ">
                            ExternalName is required and cannot be left empty.
                          </ng-container>
                          <ng-container *ngIf="
                              planForm.controls['externalName'].errors['maxlength']
                            ">
                            ExternalName cannot exceed 20 characters.
                          </ng-container>
                          <ng-container *ngIf="
                              planForm.controls['externalName'].errors['pattern']
                            ">
                            ExternalName cannot contain special characters.
                          </ng-container>
                        </mat-error>
                      </mat-form-field>
                    </div>
                    <div>
                      <div class="flex align-center mb-2">
                        <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                          Plan Name (Internal)
                        </p>
                        <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                          [ngxTippy]="productnameinfo" [tippyProps]="{ placement: 'right', interactive: true }"
                          tippyName="content">help</mat-icon>
                        <ng-template #productnameinfo let-name class="t-template">
                          <div class="help-info-tooltip">
                            <div class="heading-with-background">
                              Plan name (Internal)
                            </div>
                            <div class="details">
                              <p class="text-grey-darken">
                                This is help you identify the Plan Internally
                              </p>
                            </div>
                            <button mat-button color="primary" class="px-0">
                              Learn more
                            </button>
                          </div>
                        </ng-template>
                      </div>
                      <mat-form-field appearance="outline">
                        <input required matInput placeholder="Enter here..." formControlName="internalName"
                          (input)="setPlanId($event)" />
                        <mat-error *ngIf="
                            planForm.controls['internalName'].invalid &&
                            planForm.controls['internalName'].touched
                          ">
                          <ng-container *ngIf="
                              planForm.controls['internalName'].errors['required']
                            ">
                            InternalName is required and cannot be left empty.
                          </ng-container>
                          <ng-container *ngIf="
                              planForm.controls['internalName'].errors['maxlength']
                            ">
                            InternalName cannot exceed 20 characters.
                          </ng-container>
                          <ng-container *ngIf="
                              planForm.controls['internalName'].errors['pattern']
                            ">
                            InternalName cannot contain special characters.
                          </ng-container>
                        </mat-error>
                      </mat-form-field>
                    </div>
                    <div>
                      <div class="flex align-center mb-2">
                        <p class="mat-subtitle-2 font-weight-500 text-blue-darken">
                          Description
                        </p>
                      </div>
                      <mat-form-field appearance="outline">
                        <textarea matInput placeholder="Enter here..." formControlName="description"></textarea>
                        <mat-error *ngIf="
                            planForm.controls['description'].invalid &&
                            planForm.controls['description'].touched
                          ">
                          <ng-container *ngIf="
                              planForm.controls['description'].errors['maxlength']
                            ">
                            Description cannot exceed 500 characters.
                          </ng-container>
                        </mat-error>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="action-btns flex align-center justify-between pl-1">
            <mat-checkbox color="primary" formControlName="status" [disableRipple]="true"
              class="font-weight-500 checkbox ml-n-3 disable-ripple-checkbox">Active</mat-checkbox>
            <div>
              <button mat-stroked-button color="primary" class="mr-2 large" [routerLink]="'/plans'">
                Back
              </button>
              <button *ngIf="!editable" mat-flat-button color="primary" class="large" type="button" (click)="onSubmit()"
                [disabled]="planForm.invalid">
                Create
              </button>
              <button *ngIf="editable" mat-flat-button color="primary" class="large" type="button" (click)="onSubmit()">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
        `,
      },
    },
  },  
};

export default meta;
type Story = StoryObj<planDetailsComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const planDetails: Story = {
    args: {
    },
};

