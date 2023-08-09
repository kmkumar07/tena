import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { createProductComponent } from '../createProduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<createProductComponent> = {
  component: createProductComponent,
  title: 'softobiz-ui/Pages/createProduct',
  tags: ['autodocs'],
  render: (args: createProductComponent) => ({
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
        SharedModule
      ],

    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="header-section pt-6 pb-6 pr-6 main-bg">
  <div class="flex align-center justify-between">
    <div class="flex align-center">
      <mat-icon
        class="material-symbols-outlined pointer"
        color="primary"
        >keyboard_backspace</mat-icon
      >
      <p class="fs-xl fw-500 text-text text-dark">Create Product</p>
    </div>
  </div>
</div>
<div class="create-product-wrapper p-11">
  <div class="inner-form-wrapper flex align-start">
    <div class="form-block border-2 mr-8 p-10 main-bg wrapper-border w-60p">
      <div class="pb-4 divider-bt-black">
        <h3 class="mat-subtitle-1 fw-500 text-text text-dark mb-0">Basic Product Details</h3>
      </div>
      <div class="input-wrapper mt-8">
        <form>
          <div>
            <div class="flex align-center mb-2">
              <p class="mat-subtitle-2 font-weight-500 input-label">
                Product Name
              </p>
              <mat-icon
                class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                [ngxTippy]="productnameinfo"
                [tippyProps]="{ placement: 'right', interactive: true }"
                tippyName="content"
                >help</mat-icon
              >
              <ng-template #productnameinfo let-name class="t-template">
                <div class="help-info-tooltip">
                  <div class="heading-with-background">Product name</div>
                  <div class="details">
                    Enter a name that helps you identify this Product
                  </div>
                  <button mat-button color="primary" class="px-0">
                    Learn more
                  </button>
                </div>
              </ng-template>
            </div>
            <mat-form-field appearance="outline">
              <input
                matInput
                placeholder="Enter here..."
              />
            </mat-form-field>
          </div>
          <div>
            <div class="flex align-center mb-2">
              <p class="mat-subtitle-2 font-weight-500 input-label">
                Product ID
              </p>
              <mat-icon
                class="material-symbols-outlined pointer ml-3 help-icon text-text text-primary"
                [ngxTippy]="helpinfotooltip"
                [tippyProps]="{ placement: 'right', interactive: true }"
                >help</mat-icon
              >
              <ng-template #helpinfotooltip let-name>
                <div class="help-info-tooltip">
                  <div class="heading-with-background">Description</div>
                  <div class="details">
                    Enter a id that helps you identify this Product
                  </div>
                </div>
              </ng-template>
            </div>
            <mat-form-field appearance="outline">
              <input
                matInput
                placeholder="Enter here..."
              />
            </mat-form-field>
          </div>
          <div>
            <div class="flex align-center mb-2">
              <p class="mat-subtitle-2 font-weight-500 input-label">
                Description
              </p>
            </div>
            <mat-form-field appearance="outline">
              <textarea
                matInput
                placeholder="Enter here..."
              ></textarea>
            </mat-form-field>
          </div>
        </form>
      </div>
    </div>
    <div
      class="form-block image-upload-dialog main-bg border-2 p-10 wrapper-border w-40p"
    >
      <!-- <h4 class="text-dark mat-subtitle-2 mb-2 font-weight-500">
        Product Logo
      </h4>
      <p class="mat-caption grey-text text-darken-6">
        Allowed JPG, GIF or PNG. Max size of 800K
      </p>
      <div>
        <label for="logo" class="upload-field border-2 pointer" id="file-label" (click)="openDialog('0ms', '0ms')">
          <img src="" class="w-full" />
          <div class="file-thumbnail">
            <mat-icon class="material-symbols-outlined m-0"
              >imagesmode</mat-icon
            >
            <h3
              id="filename"
              class="mat-body-1 font-weight-500 text-text text-primary"
            >
              <a href="" class="mr-1 primary-text text-main text-underline"
                >Click here to upload</a
              >or drag & drop
            </h3>
          </div>
        </label>
      </div> -->
      <div
        *ngIf="uploadMessage"
        class="upload-message"
        [ngClass]="{ success: uploadSuccess, error: !uploadSuccess }"
      >
        {{ uploadMessage }}
      </div>
      <div class="user-img-wrapper flex align-center">
        <div class="user-avatar flex align-center justify-center">
          <ng-container>
            <p class="mat-body-1 mb-0">LOGO</p>
          </ng-container>
        </div>
        <div class="ml-6">
          <div class="upload-actions">
            <div class="flex align-center">
              <button
                mat-stroked-button
                color="primary"
                class="mr-3"
              >
                Remove
              </button>
              <button
                mat-flat-button
                color="primary"
              >
                Upload
              </button>
            </div>
          </div>
          <p class="mat-caption text-light font-weight-500 mt-3">
            Allowed JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
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
type Story = StoryObj<createProductComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const createProduct: Story = {
    args: {
    },
};

