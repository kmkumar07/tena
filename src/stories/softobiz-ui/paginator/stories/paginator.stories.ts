import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PaginatorComponent } from '../paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<PaginatorComponent> = {
  component: PaginatorComponent,
  title: 'softobiz-ui/Organism/Paginator',
  tags: ['autodocs'],
  render: (args: PaginatorComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatIconModule, MatPaginatorModule,]
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <mat-paginator
        (page)="handlePageEvent($event)"
        [length]="length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        [pageIndex]="pageIndex"
        aria-label="Select page">
        </mat-paginator>

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PaginatorComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Paginator: Story = {
  args: {},
};
