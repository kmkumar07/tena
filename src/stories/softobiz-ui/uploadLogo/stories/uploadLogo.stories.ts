import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UploadLogoComponent } from '../uploadLogo.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<UploadLogoComponent> = {
  component: UploadLogoComponent,
  title: 'softobiz-ui/Molecules/UploadLogo',
  tags: ['autodocs'],
  render: (args: UploadLogoComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {

  },
  decorators: [
    moduleMetadata({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        AngularMaterialModule,
      ],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="image-upload-dialog">
        <h4 class="text-dark mat-subtitle-2 mb-2 font-weight-500">Upload Logo</h4>
        <p class="mat-caption grey-text text-darken-6">
          Allowed JPG, GIF or PNG. Max size of 800K
        </p>
        <div>
          <input type="file" name="logo" id="logo" accept="image/*" (change)="handleFileInput($event)" />
          <label for="logo" class="upload-field border-2 pointer" id="file-label"  (dragenter)="handleDragEnter()"
          (dragleave)="handleDragLeave()"
          (drop)="handleDrop($event)">
           <img 
              [src]="imageSrc" 
              [class.loaded]="imageLoaded"
              (load)="handleImageLoad()"
              class="w-full" />
            <div class="file-thumbnail" [style.display]="imageLoaded ? 'none' : 'block'">
              <mat-icon class="material-symbols-outlined m-0">imagesmode</mat-icon>
              <h3 id="filename" class="mat-body-1 font-weight-500 text-text text-primary">
                <a href="" class="mr-1 primary-text text-main text-underline">Click here to upload</a
                >or drag & drop
              </h3>
            </div>
          </label>
        </div>
        <div class="action-btns flex align-center justify-end">
          <button mat-stroked-button color="primary" class="mr-2" mat-dialog-close (click)="cancel()">Dismiss</button>
          <button mat-flat-button color="primary" class="" mat-dialog-close (click)="handleSave()" >Save</button>
        </div>
      </div>
     
      `
      },
    },
  },
};

export default meta;
type Story = StoryObj<UploadLogoComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const UploadLogo: Story = {

};

