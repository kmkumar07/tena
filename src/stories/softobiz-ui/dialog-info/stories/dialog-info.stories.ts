import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogInfoComponent } from '../dialog-info.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DialogInfoComponent> = {
  component: DialogInfoComponent,
  title: 'softobiz-ui/Molecules/Dialog-info',
  tags: ['autodocs'],
  render: (args: DialogInfoComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),

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
        <div class="border-2 text-center coupons-dialog">
        <div class="close-dialog-icon">
            <mat-icon (click)="onCancelClick()" class="material-symbols-outlined">close</mat-icon>
        </div>
        <div class="mb-6">
            <img src="/coupons-delete-confirmation.png" alt="delete-confirmation">
        </div>
        <h1 class="mb-4">Confirmation</h1>
        <span class="mat-body-1 mb-8 block">Are you sure you want to delete plan</span
        >
        <div class="flex-center">
          <button mat-stroked-button color="primary" mat-dialog-close (click)="onCancelClick()" class="px-6 medium">Cancel</button>
          <button mat-flat-button color="primary" class="medium ml-2" [mat-dialog-close]="true" (click)="onYesClick()">Yes</button>
        </div>
      </div>
      `
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogInfoComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const DialogInfo: Story = {
  args: {
    withIcon: false,
  },
};

// export const MenuWithIcon: Story = {
//   args: {
//     withIcon: true,
//   },
//   parameters: {
//     docs: {
//       source: {
//         code: `
//         <mat-icon class="material-symbols-outlined" [matMenuTriggerFor]="actionsMenu">
//           more_vert
//         </mat-icon>
//         <mat-menu #actionsMenu="matMenu" class="actions-menu" backdropClass="edit-menu">
//           <button mat-menu-item disableRipple>
//             <mat-icon class="material-symbols-outlined"
//               ><img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3"
//             /></mat-icon>
//             Edit
//           </button>
//           <button mat-menu-item disableRipple>
//             <mat-icon class="material-symbols-outlined"
//               ><img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3"
//             /></mat-icon>
//             Delete
//           </button>
//         </mat-menu>
//         `,
//       },
//     },
//   },
// };
