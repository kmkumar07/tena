import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { StepperComponent } from '../stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<StepperComponent> = {
  component: StepperComponent,
  title: 'softobiz-ui/Organism/Stepper',
  tags: ['autodocs'],
  render: (args: StepperComponent) => ({
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
        BrowserAnimationsModule,
        MatIconModule,
        MatStepperModule
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <div class="stepper-wrapper">
        <mat-stepper orientation="vertical" #stepper [disableRipple]="true">
          <mat-step id="foo-bar">
            <ng-template matStepLabel>
              <div >
                <span id="step-id1" class="block text-dark font-weight-500">step 1</span>
                <span
                  class="block font-weight-600 mat-subtitle-2 text-headline-light"
                  >Plan Information</span
                >
              </div>
            </ng-template>
          </mat-step>
          <mat-step id="foo-bar">
            <ng-template matStepLabel>
              <div >
                <span id="step-id2" class="block text-dark font-weight-500">step 2</span>
                <span
                  class="block font-weight-600 mat-subtitle-2 text-headline-light"
                  >Plan Information</span
                >
              </div>
            </ng-template>
          </mat-step>
          <mat-step id="foo-bar">
            <ng-template matStepLabel>
              <div >
                <span id="step-id3" class="block text-dark font-weight-500">step 3</span>
                <span
                  class="block font-weight-600 mat-subtitle-2 text-headline-light"
                  >Plan Information</span
                >
              </div>
            </ng-template>
          </mat-step>
          <mat-step id="foo-bar">
            <ng-template matStepLabel>
              <div >
                <span id="step-id4" class="block text-dark font-weight-500">step 4</span>
                <span
                  class="block font-weight-600 mat-subtitle-2 text-headline-light"
                  >Plan Information</span
                >
              </div>
            </ng-template>
          </mat-step>
          <mat-step id="foo-bar">
            <ng-template matStepLabel>
              <div >
                <span id="step-id5" class="block text-dark font-weight-500">step 5</span>
                <span
                  class="block font-weight-600 mat-subtitle-2 text-headline-light"
                  >Plan Information</span
                >
              </div>
            </ng-template>
          </mat-step>
        </mat-stepper>
      </div>      
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Stepper: Story = {
  args: {
  },
};
