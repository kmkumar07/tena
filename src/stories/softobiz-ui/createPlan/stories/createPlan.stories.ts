import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { createPlanComponent } from '../createPlan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<createPlanComponent> = {
  component: createPlanComponent,
  title: 'softobiz-ui/Pages/createPlan',
  tags: ['autodocs'],
  render: (args: createPlanComponent) => ({
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
        <div class="plan-outer-bolck mt-11">
        <!-- pricing details -->
        <div class="plan-details p-10 border-2 main-bg mb-4 basic-border">
          <div class="heading flex align-center justify-between pb-3">
            <div class="flex align-center">
              <div class="icon-img mr-4">
                <img src="../../../../../../assets/images/icons/carbon_document-multiple-02.svg"
                  alt="carbon_document-multiple-icon" />
              </div>
              <abbr class="fs-xl font-weight-500 text-blue-darken">Plan Details</abbr>
            </div>
            <div class="flex">
              <button mat-stroked-button color="primary" class="mr-3 small font-weight-500 px-4">
                Edit
              </button>
              <button mat-stroked-button color="primary" class="small font-weight-500 px-4">
                Delete
              </button>
            </div>
          </div>
      
          <div class="info-details py-8 flex">
            <div class="details">
              <h5 class="text-grey-darken mat-subtitle-2 mb-2">Plan Name</h5>
              <h6 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-0">Premium</h6>
            </div>
            <div class="details">
              <h5 class="text-grey-darken mat-subtitle-2 mb-2">Plan Id</h5>
              <h6 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-0">#AS- 012P</h6>
            </div>
            <div class="details">
              <h5 class="text-grey-darken mat-subtitle-2 mb-2">Plan Status</h5>
              <h6 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-0">Active</h6>
            </div>
          </div>
      
          <div class="description-box">
            <h5 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-2">Plan Description</h5>
            <p class="text-grey-darken mat-subtitle-2">
              Smart plan with the right mix of basic and slightly advanced tools to help you with all marketing and sales
              requirements
              right mix of basic and slightly advanced tools to help.
            </p>
          </div>
        </div>
      
        <!-- pricing plan -->
        <div class="pricing-plan p-10 border-2 main-bg mb-4 basic-border">
          <div class="plan-info-block inner-wrapper">
            <div class="heading flex justify-between align-center pb-3">
              <div class="flex  align-center">
                <div class="icon-img mr-4">
                  <img src="../../../../../../assets/images/icons/basil_invoice-outline.svg" alt="icon" />
                </div>
                <abbr class="fs-xl font-weight-500 text-blue-darken">Pricing Plan</abbr>
              </div>
              <!-- <button mat-stroked-button color="primary" class="mr-3 small font-weight-500 px-4">
                Add Pricing
              </button> -->
            </div>
            <div class="info-form">
              <div class="flag-wrapper flex align-center px-4 py-2 border-1 my-4">
                <div class="flag-img mr-3">
                  <img src="../../../../../../assets/images/flags.png" alt="flags" />
                </div>
                <span class="mat-subtitle-2 text-blue-darken">USD</span>
              </div>
              <div class="table-wrapper mt-3">
                <table class="w-full">
                  <tr>
                    <th class="mat-subtitle-2 text-blue-darken pl-2">
                      Pricing Cycle
                    </th>
                    <th class="mat-subtitle-2 text-blue-darken">
                      Pricing Model
                    </th>
                    <th class="mat-subtitle-2 text-blue-darken">
                      Billing Cycle
                    </th>
                    <th class="mat-subtitle-2 text-blue-darken">
                      Price
                    </th>
                    <th class="mat-subtitle-2 text-blue-darken action-header text-center">
                      Action
                    </th>
                  </tr>
      
                  <tr>
                    <td class="mat-subtitle-2 text-grey-darken pl-2">
                      Daily
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
                      Tired
                    </td>
                    <td>
                      <span class="mat-subtitle-2 text-grey-darken billing-fixed px-2 py-1 border-1">
                        Fixed
                      </span>
                    </td>
                    <td class="mat-subtitle-2 text-purple-lighten-1">
                      $100/Unit
                    </td>
      
                    <td class="pr-7">
                      <div class="flex justify-end">
                        <button class="flex edit-btn mat-caption mr-1" mat-button color="primary">
                          <mat-icon class="material-symbols-outlined mr-1" color="primary">edit</mat-icon>Edit
                        </button>
                        <button mat-icon-button color="warn" class="light-bg small rounded-1">
                          <mat-icon class="material-symbols-outlined mr-0" color="warn">close</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="mat-subtitle-2 text-grey-darken pl-2">
                      Weekly
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
      
                    </td>
                    <td>
      
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
                      <button class="set-btn flex align-center text-purple-lighten-1 transparent-bg mat-body-1"
                        (click)="setPrice()">
                        Set Price
                        <mat-icon class="material-symbols-outlined ml-2" color="primary">
                          arrow_right_alt
                        </mat-icon>
                      </button>
      
                    </td>
      
                    <td class="pr-7">
      
                    </td>
                  </tr>
                  <tr>
                    <td class="mat-subtitle-2 text-grey-darken pl-2">
                      Monthly
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
      
                    </td>
                    <td>
      
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
                      <button class="set-btn flex align-center text-purple-lighten-1 transparent-bg mat-body-1"
                        (click)="setPrice()">
                        Set Price
                        <mat-icon class="material-symbols-outlined ml-2" color="primary">
                          arrow_right_alt
                        </mat-icon>
                      </button>
      
                    </td>
      
                    <td class="pr-7">
      
                    </td>
                  </tr>
                  <tr>
                    <td class="mat-subtitle-2 text-grey-darken pl-2">
                      Yearly
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
      
                    </td>
                    <td>
      
                    </td>
                    <td class="mat-subtitle-2 text-grey-darken">
                      <button class="set-btn flex align-center text-purple-lighten-1 transparent-bg mat-body-1"
                        (click)="setPrice()">
                        Set Price
                        <mat-icon class="material-symbols-outlined ml-2" color="primary">
                          arrow_right_alt
                        </mat-icon>
                      </button>
      
                    </td>
      
                    <td class="pr-7">
      
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      
        <!-- product details -->
        <div class="product-details p-10 border-2 main-bg mb-4 basic-border">
          <div class="plan-info-block inner-wrapper">
            <div class="heading flex justify-between pb-3">
              <div class="flex align-center">
                <div class="icon-img mr-4">
                  <img src="../../../../../../assets/images/icons/product-icon.svg" alt="icon" />
                </div>
                <abbr class="fs-xl font-weight-500 text-blue-darken">Product Details</abbr>
              </div>
              <button mat-stroked-button color="primary" class="mr-3 small font-weight-500 px-4"
                (click)="addProductDetails()">
                Add product
              </button>
            </div>
          </div>
      
          <!-- Product Details inner -->
          <div class="plan-section-block border-2 mt-4">
            <div class="plan-info-block inner-wrapper">
              <div class="details-wrapper py-3 px-5 border-2">
                <div class="details-inner flex justify-between">
                  <div class="flex">
                    <div class="product-img p-2 mr-4">
                      <img src="../.././../../assets/images/teams.png" alt="product-img" />
                    </div>
                    <div class="mt-2">
                      <div>
                        <h6 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-1">
                          MS Team
                        </h6>
                        <span class="mat-body-1 font-weight-500 text-blue-darken">3 Features
                          included</span>
                      </div>
                      <div class="flex mt-3">
                        <div class="info-details">
                          <h5 class="mat-subtitle-2 text-grey-darken mb-1">Whiteboard</h5>
                          <a class="mat-subtitle-2 text-blue-darken font-weight-500" (click)="editFeatureDetails()">ON</a>
                        </div>
                        <div class="info-details">
                          <h5 class="mat-subtitle-2 text-grey-darken mb-1">Email support</h5>
                          <a class="mat-subtitle-2 text-blue-darken font-weight-500">All Week</a>
                        </div>
                        <div class="info-details">
                          <h5 class="mat-subtitle-2 text-grey-darken mb-1">User License</h5>
                          <a class="mat-subtitle-2 text-blue-darken font-weight-500">10 License</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <button class="flex icon-text mat-caption mr-4" mat-button color="primary">
                      <mat-icon class="material-symbols-outlined mr-1" color="primary">edit</mat-icon>Edit
                    </button>
                    <button mat-icon-button color="warn" class="light-bg small rounded-1">
                      <mat-icon class="material-symbols-outlined mr-0" color="warn">close</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <!-- addon  details -->
        <div class="addon-detail p-10 border-2 main-bg mb-4 basic-border">
          <div class="heading flex justify-between pb-3">
            <div class="flex align-center">
              <div class="icon-img mr-4">
                <img src="../../../../../../assets/images/icons/addon-icon.svg" alt="icon" />
              </div>
              <abbr class="fs-xl font-weight-500 text-blue-darken">Add-ons Details</abbr>
            </div>
            <button mat-stroked-button color="primary" class="mr-3 small font-weight-500 px-4" (click)="addOnDetails()">
              Add Add-on
            </button>
          </div>
          <div class="details-wrapper add-on-view-wrapper mt-6 p-3 border-2">
            <div class="details-inner flex align-center">
              <div class="product-img p-2 mr-4">
                <img src="../.././../../assets/images/teams.png" alt="product-img" />
              </div>
              <div>
                <h6 class="mat-subtitle-2 font-weight-500 text-blue-darken mb-1">
                  MS Team
                </h6>
                <span class="mat-body-1 font-weight-500 text-blue-darken">3 Features
                  included</span>
              </div>
            </div>
      
            <div class="content-wrapper">
              <div class="flex mt-3">
                <div class="info-details">
                  <h5 class="mat-subtitle-2 text-grey-darken mb-1">Whiteboard</h5>
                  <a class="mat-subtitle-2 text-blue-darken font-weight-500" (click)="editFeatureDetails()">ON</a>
                </div>
                <div class="info-details">
                  <h5 class="mat-subtitle-2 text-grey-darken mb-1">Email support</h5>
                  <a class="mat-subtitle-2 text-blue-darken font-weight-500">All Week</a>
                </div>
                <div class="info-details">
                  <h5 class="mat-subtitle-2 text-grey-darken mb-1">User License</h5>
                  <a class="mat-subtitle-2 text-blue-darken font-weight-500">10 License</a>
                </div>
              </div>
              <div class="flex mt-6">
                <div class="add-on-details-wrapper px-2 py-3">
                  <div class="add-on-detail">
                    <div class="heading-content pl-3">
                      <span class="title font-weight-700 text-blue-darken mat-subtitle-1">Teamwork and
                        communication</span>
                      <p class="subtile mat-body-1 text-grey-darken mt-2">
                        It is a long established fact that a reader will be
                        distracted.
                      </p>
                    </div>
                    <div class="flex mt-4 pl-4">
                      <div class="info-details">
                        <h5 class="mat-body-1 text-grey-darken mb-1">Host online calls</h5>
                        <a class="mat-body-1 text-blue-darken font-weight-500" (click)="editFeatureDetails()">1-50</a>
                      </div>
                      <div class="info-details">
                        <h5 class="mat-body-1 text-grey-darken mb-1">Host webinars</h5>
                        <a class="mat-body-1 text-blue-darken font-weight-500">50-100</a>
                      </div>
                      <div class="info-details">
                        <h5 class="mat-body-1 text-grey-darken mb-1">Create team sites</h5>
                        <a class="mat-body-1 text-blue-darken font-weight-500">ON</a>
                      </div>
                    </div>
                  </div>
                </div>
                <button mat-icon-button color="warn" class="light-bg small rounded-1 ml-2" [disabled]="!stepOneCompleted">
                  <mat-icon class="material-symbols-outlined mr-0" color="warn">close</mat-icon>
                </button>
              </div>
      
              <div class="info-form">
                <div class="flag-wrapper flex align-center pt-8 pb-2">
                  <div class="flag-img mr-2">
                    <img src="../../../../../../assets/images/flags.png" alt="flags" />
                  </div>
                  <span class="mat-subtitle-2 text-headline-dark">USD</span>
                </div>
                <div class="table-wrapper mt-3 small-table">
                  <table mat-table [dataSource]="dataSource" class="">
                    <!-- PricingCycle Column -->
                    <ng-container matColumnDef="PricingCycle">
                      <th mat-header-cell *matHeaderCellDef class="mat-body-1 text-blue-darken">
                        Pricing Cycle
                      </th>
                      <td mat-cell *matCellDef="let element" class="mat-body-1 text-blue-darken">
                        {{ element.PricingCycle }}
                      </td>
                    </ng-container>
      
                    <!-- Price Column -->
                    <ng-container matColumnDef="Price">
                      <th mat-header-cell *matHeaderCellDef class="mat-body-1 text-blue-darken">
                        Price
                      </th>
                      <td mat-cell *matCellDef="let element"
                        class="mat-body-1 text-purple-lighten-1 font-weight-500 price-cell">
                        <div class="flex align-center pointer" (click)="setPrice()">
                          {{ element.Price
                          }}<mat-icon class="material-symbols-outlined ml-2" color="primary">arrow_right_alt</mat-icon>
                        </div>
                      </td>
                    </ng-container>
      
                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row (click)="clickedRows.add(row)" [class.demo-row-is-clicked]="clickedRows.has(row)"
                      *matRowDef="let row; columns: displayedColumns"></tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Charges -->
        <div class="charges-block p-10 border-2 main-bg mb-4 basic-border">
          <div class="heading flex justify-between align-center pb-3">
            <div class="flex  align-center">
              <div class="icon-img mr-4">
                <img src="../../../../../assets/images/icons/money.svg" alt="money-icon" />
              </div>
              <abbr class="fs-xl font-weight-500 text-blue-darken">Charges</abbr>
            </div>
          </div>
          <div class="input-wrapper mt-6">
            <div class="">
              <div class="flex align-center mb-2">
                <p class="mat-subtitle-2 font-weight-500 text-blue-darken">Charges</p>
                <mat-icon class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                  [ngxTippy]="chargesInfo" [tippyProps]="{ placement: 'right', interactive: true }">help</mat-icon>
                <ng-template #chargesInfo let-name>
                  <div class="help-info-tooltip">
                    <div class="heading-with-background">Charges</div>
                    <div class="details">
                      You can create and select charges to include it in the plan
                    </div>
                    <button mat-button color="primary" class="px-0">
                      Learn more
                    </button>
                  </div>
                </ng-template>
              </div>
              <mat-form-field appearance="outline" class="border-2 with-footer-btn">
                <!-- <mat-label> Select </mat-label> -->
                <mat-select required placeholder="select" multiple>
                  <mat-option value="Setup Fee"> Setup Fee </mat-option>
                  <mat-option value="Activation Fee"> Activation Fee </mat-option>
                  <mat-option value="Implementation Charges">
                    Implementation Charges
                  </mat-option>
                  <button mat-button color="primary" class="px-0 w-full add-new-btn-list pl-4 mat-body-1 large"
                    (click)="addNewCharge()">
                    <mat-icon class="material-symbols-outlined" color="primary">add_circle</mat-icon>Add New Charge
                  </button>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <!-- setup fee inputs -->
          <div class="fee-input-wrapper">
            <div class="fee-input flex align-center justify-between">
              <span class="mat-subtitle-2 text-blue-darken">Setup fee</span>
              <div class="flex">
                <div class="input-wrapper">
                  <mat-form-field appearance="outline" class="mb-0">
                    <input matInput placeholder="Enter here..." />
                  </mat-form-field>
                </div>
                <button mat-icon-button color="warn" class="medium-w light-bg rounded ml-2 my-1" [disabled]="!stepOneCompleted">
                  <mat-icon class="material-symbols-outlined mr-0" color="warn">close</mat-icon>
                </button>
              </div>
            </div>
            <div class="fee-input flex align-center justify-between">
              <span class="mat-subtitle-2 text-blue-darken">Activation fee</span>
              <div class="flex">
                <div class="input-wrapper">
                  <mat-form-field appearance="outline" class="mb-0">
                    <input matInput placeholder="Enter here..." />
                  </mat-form-field>
                </div>
                <button mat-icon-button color="warn" class="medium-w light-bg rounded ml-2 my-1" [disabled]="!stepOneCompleted">
                  <mat-icon class="material-symbols-outlined mr-0" color="warn">close</mat-icon>
                </button>
              </div>
            </div>
          </div>
      
          <!-- setup fee inputs -->
          <!-- <div class="action-btns flex align-center justify-end">
            <div>
              <button mat-stroked-button color="primary" class="mr-2 large" [disabled]="!stepOneCompleted">
                Dismiss
              </button>
              <button mat-flat-button color="primary" class="large" type="submit" [disabled]="!stepOneCompleted">
                Save
              </button>
            </div>
          </div> -->
        </div>
      
        <div class="text-right">
          <button mat-flat-button color="primary">
            Back to list
          </button>
        </div>
      </div>
        `,
      },
    },
  },  
};

export default meta;
type Story = StoryObj<createPlanComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const createPlan: Story = {
    args: {
    },
};

