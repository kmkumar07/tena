import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogComponent } from '../dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DialogComponent> = {
  component: DialogComponent,

  title: 'softobiz-ui/Organism/Dialog',
  tags: ['autodocs'],
  render: (args: DialogComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {},
  decorators: [
    moduleMetadata({
      providers: [MatDialog],
      imports: [
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DialogComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Dialog: Story = {
  args: {},
};
