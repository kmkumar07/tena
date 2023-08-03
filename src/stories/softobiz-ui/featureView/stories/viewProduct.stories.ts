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
    moduleMetadata({
      imports: [
        CommonModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
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
        <div class="view-product-wrapper">
  <div class="header-block border-2">
    <!-- <h3 class="mat-headline-5 heading text-text text-primary">View Product</h3> -->
    <div class="flex align-end justify-between inner-block">
      <div class="brand-info flex align-center">
        <div class="product-img mr-4 border-2"
          *ngIf="productDetail?.imageUrl && productDetail.imageUrl.length > 1;else uploadImage">
          <img src="{{ imagePath + imageUrl }}" alt="{{imageName}}" />
        </div>
        <ng-template #uploadImage>
          <div class="productImg-wrapper">
            <div class="product-img border-2">
              <img src="no-image.logo.jpg" alt="product-img" />
            </div>
          </div>
        </ng-template>
        <div>
          <div class="">
            <h5 class="mat-headline-5  font-weight-600 text-white mb-2">
              Microsoft Teams
            </h5>
            <p class="mat-subtitle-2 font-weight-500 sub-title">
              O365ProPlusRetail
            </p>
          </div>
          <span class="mat-subtitle-2 subtitle font-weight-500 block">{{productId}}</span>
        </div>
      </div>
      <div class="date-block flex align-center mb-8">
        <div class="flex align-center">
          <mat-icon class="material-symbols-outlined mr-3 text-white">calendar_today</mat-icon>
          <p class="mat-subtitle-2 text-white">Created 24 March, 2023</p>
        </div>
        <div class="vertical-divider mx-6"></div>
        <div class="flex align-center">
          <mat-icon class="material-symbols-outlined mr-3 text-white">calendar_today</mat-icon>
          <p class="mat-subtitle-2 text-white"> Modified 24 Apr, 2023</p>
        </div>
      </div>
    </div>
    <div class="product-desc">
      <h4 class="mat-subtitle-1 font-weight-500 mb-4 text-headline-dark">Description</h4>
      <p class="mat-subtitle-2 text-grey-darken">
        Microsoft Teams is a proprietary business communication platform developed by Microsoft, as part of the
        Microsoft 365 family of products. Teams primarily competes with the similar service Slack, offering workspace
        chat and videoconferencing, file storage, and application integration.
      </p>
    </div>
  </div>
  <div class="header-block border-2 mt-6">
    <div class="product-features">
        <h4 class="mat-subtitle-2 text-blue-darken font-weight-500 mb-4">Features</h4>
      <!-- with feature added -->
      <div class="features-wrapper">
        <div *ngIf="productDetail?.feature && productDetail.feature.length > 0; else noFeaturesBlock">
          <div class="feature-item flex border-2 secondary-light-bg"
            *ngFor="let feature of productDetail.feature; let i = index">
            <div class="feature-logo border-2 flex-center font-weight-500 primary-text text-main">
              <span>{{ feature.featureId}}</span>
            </div>
            <div class="details ml-8">
              <div class="flex align-center mb-2">
                <span class="mat-subtitle-2 font-weight-500 text-text text-primary">{{ feature.name }}</span>
                <div class="active-text flex align-center green-text text-darken-3 ml-6">
                  <mat-icon class="material-symbols-outlined mr-1 green-text text-darken-3"
                    color="primary">check_circle</mat-icon><span>{{feature.status}}</span>
                </div>
              </div>
              <p class="mat-body-1 text-dark mb-2">
                {{ feature.description }}
              </p>
              <span class="text-dark">Feature type : </span>
              <span class="text-text text-primary ml-3">{{feature.type}}</span>
            </div>
            <div class="action-btns flex align-center">
              <button mat-button color="primary" [routerLink]="['/features/edit-feature/'+feature.featureId]">
                <mat-icon class="material-symbols-outlined mb-1 small edit-icon" color="primary">
                  edit </mat-icon>Edit
              </button>
              <button mat-icon-button class="mb-1 ml-4" color="warn"
                aria-label="Example icon button with a vertical three dot icon" (click)="openDelete(feature.featureId)">
                <mat-icon class="material-symbols-outlined" color="warn">close</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- No features block -->
        <ng-template #noFeaturesBlock>
          <div class="feature-add-block flex align-center justify-center p-6">
            <div class="text-center flex align-center flex vertical">
              <div class="icon-with-bg">
                <div class="bg-box"></div>
                <div class="icon inherit">
                  <mat-icon class="material-symbols-outlined mb-1">featured_play_list</mat-icon>
                </div>
              </div>
              <p class="mat-subtitle-2 text-dark-1 mb-3 font-weight-500">
                You have not added features
              </p>
              <button mat-button color="primary" class="small" (click)="navigateToFeatures()">
                Create Features
              </button>
            </div>
          </div>
        </ng-template>
      </div>
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

