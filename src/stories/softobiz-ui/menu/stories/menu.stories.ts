import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenuComponent } from '../menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// const withIcon = true; // Set the condition based on your requirement

// const codeWithIcon = `
//     <mat-icon class="material-symbols-outlined" [matMenuTriggerFor]="actionsMenu">
//       more_vert
//     </mat-icon>

//     <mat-menu #actionsMenu="matMenu" class="actions-menu" backdropClass="edit-menu">
//       <button mat-menu-item disableRipple>
//         <mat-icon class="material-symbols-outlined">
//           <img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3" />
//         </mat-icon>
//         Edit
//       </button>
//       <button mat-menu-item disableRipple>
//         <mat-icon class="material-symbols-outlined">
//           <img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3" />
//         </mat-icon>
//         Delete
//       </button>
//     </mat-menu>
//   `;

// const codeWithoutIcon = `
//     <mat-icon class="material-symbols-outlined" [matMenuTriggerFor]="actionsMenu">
//       more_vert
//     </mat-icon>

//     <mat-menu #actionsMenu="matMenu" class="actions-menu" backdropClass="edit-menu">
//       <button mat-menu-item disableRipple>
//         Edit
//       </button>
//       <button mat-menu-item disableRipple>
//         Delete
//       </button>
//     </mat-menu>
//   `;
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<MenuComponent> = {
  component: MenuComponent,
  title: 'softobiz-ui/Molecules/Menu',
  tags: ['autodocs'],
  render: (args: MenuComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    withIcon: {
      control: 'boolean',
    },
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
      ],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <mat-icon class="material-symbols-outlined" [matMenuTriggerFor]="actionsMenu">
          more_vert
        </mat-icon>
        <mat-menu #actionsMenu="matMenu" class="actions-menu" backdropClass="edit-menu">
          <button mat-menu-item disableRipple>
            <mat-icon class="material-symbols-outlined"
              ><img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3"
            /></mat-icon>
            Edit
          </button>
          <button mat-menu-item disableRipple>
            <mat-icon class="material-symbols-outlined"
              ><img src="/icons/bunny.svg" alt="bunny-icon" class="mr-3"
            /></mat-icon>
            Delete
          </button>
        </mat-menu>
      `,
        // code: ({ withIcon }: MenuComponent) => {
        //   const codeWithIcon = `
        //     // Source code with icon
        //   `;

        //   const codeWithoutIcon = `
        //     // Source code without icon
        //   `;

        //   return withIcon ? codeWithIcon : codeWithoutIcon;
        // },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Menu: Story = {
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
