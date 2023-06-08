import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DividerComponent } from '../divider.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DividerComponent> = {
  component: DividerComponent,

  title: 'softobiz-ui/Organism/Divider',
  tags: ['autodocs'],
  render: (args: DividerComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    inset: {
      control: 'boolean',
    },

    vertical: {
      control: 'boolean',
    },
  },
  decorators: [
    moduleMetadata({
      providers: [],
      imports: [
        MatDividerModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DividerComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Divider: Story = {
  args: {},
};
