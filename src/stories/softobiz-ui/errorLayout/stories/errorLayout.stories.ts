import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { ErrorLayoutComponent } from '../errorLayout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ErrorLayoutComponent> = {
  component: ErrorLayoutComponent,
  title: 'softobiz-ui/Pages/Error',
  tags: ['autodocs'],
  render: (args: ErrorLayoutComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['E404', 'E505'],
    },
    imgUrl: { control: 'text' },
    subHeader:{ control: 'text' },
    details:{ control: 'text' },

  },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div class="error-page">${story}</div>`
    ),
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
 
};

export default meta;
type Story = StoryObj<ErrorLayoutComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Error404: Story = {
    args: {
      variant: 'E404',
      imgUrl:'404-page.png',
      subHeader:'Oops! Why you’re here?',
      details:'We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.',
    },
    parameters: {
      storybook: {
        hideNoControlsWarning: true,
      },
      docs: {
        source: {
          code: `
          <div>
          <div class="absolute position-center text-center">
        <div class="">
          <img src="404-page.png" alt="No Page Found" />
          <div class="my-10">
            <p class="mat-h1 purple-text text-darken-1"> Oops! Why you’re here?</p>
            <p class="desc-info mt-6 text-text text-lighten-2">
            We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.
            </p>
          </div>
          <a href="">
            <sft-button [label]="'Back To Home'" [color]="'primary'" [variant]="'flat'" [disable]="false"
              [disableRipple]="false" [size]="'medium'" [onClick]="'funtion()'"></sft-button>
          </a>
        </div>
        </div>
        </div>
           `,
        },
      },

    },
};
export const Error505: Story = {
    args: {
      variant: 'E504',
      imgUrl:'505-page.png',
      subHeader:'Gateway Timeout Error',
      details:'We are very sorry for inconvenience. It looks like some how our server did not receive a timely response.',
      
    },
    parameters: {
      storybook: {
        hideNoControlsWarning: true,
      },
      docs: {
        source: {
          code: `
          <div>
          <div class="absolute position-center text-center">
            <div class="">
              <img src="505-page.png" alt="No Page Found" />
              <div class="my-10">
                <p class="mat-h1 purple-text text-darken-1">Gateway Timeout Error</p>
                <p class="desc-info mt-6 text-text text-lighten-2">
                We are very sorry for inconvenience. It looks like some how our server did not receive a timely response.
                </p>
              </div>
              <a href="">
                <sft-button [label]="'Back To Home'" [color]="'primary'" [variant]="'flat'" [disable]="false"
                  [disableRipple]="false" [size]="'medium'" [onClick]="'funtion()'"></sft-button>
              </a>
            </div>
          </div>
        </div>
           `,
        },
      },

    },
};
