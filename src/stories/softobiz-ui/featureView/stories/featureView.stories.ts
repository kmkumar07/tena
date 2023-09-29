import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { featureViewComponent } from '../featureView.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { RouterTestingModule } from '@angular/router/testing';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<featureViewComponent> = {
  component: featureViewComponent,
  title: 'softobiz-ui/Pages/featureView',
  tags: ['autodocs'],
  render: (args: featureViewComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: { },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div class="left-navigation" >${story}</div>`
    ),
    moduleMetadata({
      imports: [
        CommonModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [
        ButtonComponent,
      ],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="view-feature-wrapper pt-8">
          <div class="header-section pb-3">
            <div class="flex align-center justify-between">
              <div class="flex align-center">
                <!-- <mat-icon
                  class="material-symbols-outlined pointer"
                  color="primary"
                  [routerLink]="'/features'"
                  >keyboard_backspace</mat-icon
                > -->
                <p class="mat-headline-5 text-purple-lighten-1 font-weight-500">View Feature</p>
              </div>
              <div class="btn-section flex align-center">
                <button
                  mat-stroked-button
                  color="primary"
                  class="mr-2 large"
                  (click)="editFeature()"
                >
                  Edit
                </button>
                <button
                  mat-flat-button
                  color="primary"
                  class="large"
                  [routerLink]="'/features'"
                >
                  Back to list
                </button>
              </div>
            </div>
          </div>
          <div class="header-block">
            <div class="flex align-center justify-between">
              <div class="brand-info flex align-end">
                <div class="p-2">
                  <div class="flex align-center">
                    <p class="mat-headline-5 text-white title mb-1">
                      f5
                      <span class="mat-subtitle-1 text-white">(Ice cream)</span>
                    </p>
                    <!-- <div
                      class="active-text flex align-center green-text text-darken-3 ml-4"
                    >
                      <mat-icon
                        class="material-symbols-outlined mr-1 green-text text-darken-3"
                        color="primary"
                        >check_circle</mat-icon
                      ><span>{{ status }}</span>
                    </div> -->
                  </div>
                  <div class="flex align-center">
                    <span class="mat-subtitle-2 subtitle text-white fw-500 block">
                      f5
                    </span>
                    <span class="block feature-dot"></span>
                    <span class="block text-white mat-subtitle-2">
                      switch
                    </span>
                    <span class="block feature-dot"></span>
                    <span class="block text-white mat-subtitle-2">Created 2 August 2023</span>
                  </div>
                </div>
              </div>
              <div class="status-chip mat-body-1 text-white flex-center">
                Feature Status: <span class="active-icon block"></span>active
              </div>
            </div>
          </div>
          <div class="content-block py-6 px-10 main-bg">
            <div class="product-desc pb-6 end-line">
              <h4 class="mat-subtitle-2 font-weight-500 mb-4 text-headline-dark">
                Description
              </h4>
              <p class="mat-body-1 mb-0">
                Teams allows users to communicate in two-way persistent chats with one or multiple participants. Participants
                can message using text, emojis, stickers and gifs as well as sharing links and files. Messages can be marked as
                urgent or important. In August 2022, the chat feature was updated for "chat with yourself"; allowing for the
                organization of files, notes, comments, images, and videos within a private chat tab
              </p>
            </div>
            <div class="feature-type mt-6 end-line">
              <h4 class="mat-subtitle-2 font-weight-500 mb-4 text-headline-dark">
                Feature Type
              </h4>
        
              <!-- -----------------------switch type-------------------- -->
        
              <!-- ----------------range type--------------------------- -->
              <div class="switch-type pt-4 border-2 flex align-center px-0 pb-2">
                <!-- <mat-icon  class="material-symbols-outlined text-darken-3">arrow_range</mat-icon> -->
        
                <img src="/icons/toggle-left.svg" alt="toggle-left" />
        
                <!-- <mat-icon class="material-symbols-outlined text-darken-3 text-lighten-2">production_quantity_limits</mat-icon> -->
        
                <div>
                  <span class="mat-body-1 text-headline-light font-weight-500">
                    Switch
                    </span>
                </div>
              </div>
              <p class="mat-body-1 text-dark">
               
                "This feature type has 2 entitlement levels- “available” and “notavailable”."
              </p>
              <!-- ----------------range type--------------------------- -->
            </div>
        
            <!-- ----------------range detail--------------------------- -->
            <!-- <div *ngIf="featureType === 'range'" class="mt-8 range-detail-wrapper">
              <h4 class="mat-subtitle-2 font-weight-500 mb-4 text-headline-dark">
                Range Details
              </h4>
              <div class="range-detail py-2 px-3 border-2 mb-4 secondary-light-bg">
                <p class="mat-body-1 text-headline-dark">Entitlements Units</p>
                <span class="mat-body-1 font-weight-500 text-primary">{{ unit }}</span>
              </div>
              <div class="detail-info border-2">
                <table class="w-full odd-bg-color">
                  <th class="font-weight-500 text-darken-1">Entitlement Range</th>
                  <th class="font-weight-500 text-darken-1">Display Name</th>
                  <tr class="text-headline-light">
                    <td>{{ valueOne }} to {{ valueTwo }}</td>
                    <td class="range-td">Range</td>
                  </tr>
                </table>
              </div>
            </div> -->
            <!-- ----------------range detail--------------------------- -->
        
            <!-- ----------------quantity and custom details--------------------------- -->
            <!-- <div *ngIf="featureType === 'quantity'" class="mt-8 range-detail-wrapper">
              <h4 class="mat-subtitle-2 font-weight-500 mb-4 text-headline-dark">
                Quantity Details
              </h4>
              <div class="range-detail py-2 px-3 border-2 mb-4">
                <p class="mat-body-1 text-headline-dark">Entitlements Units</p>
                <span class="mat-body-1 font-weight-500 text-primary">{{ unit }}</span>
              </div>
              <div class="detail-info border-2">
                <table class="w-full odd-bg-color">
                  <th class="font-weight-500 text-darken-1">Entitlement Levels</th>
                  <tr class="text-headline-light" *ngFor="let displayName of displayNameArray">
                    <td>{{ displayName }}</td>
                  </tr>
                </table>
              </div>
            </div>
        
            <div *ngIf="featureType === 'custom'" class="mt-8 range-detail-wrapper">
              <h4 class="mat-subtitle-2 font-weight-500 mb-4 text-headline-dark">
                Quantity Details
              </h4>
              <div class="detail-info border-2">
                <table class="w-full odd-bg-color">
                  <th class="font-weight-500 text-darken-1">Entitlement Levels</th>
                  <tr class="text-headline-light" *ngFor="let displayName of displayNameArray">
                    <td>{{ displayName }}</td>
                  </tr>
                </table>
              </div>
            </div> -->
            <!-- ----------------quantity details--------------------------- -->
        
            <!-- ----------------range type--------------------------- -->
          </div>
        </div>
        `,
      },
    },
  },  
};

export default meta;
type Story = StoryObj<featureViewComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const featureView: Story = {
    args: {
    },
};

