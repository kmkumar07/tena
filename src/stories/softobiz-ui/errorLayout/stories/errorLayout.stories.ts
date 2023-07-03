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
    imgUrl: { control: 'text' },
    subHeader: { control: 'text' },
    details: { control: 'text' },
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

export const Error: Story = {
  args: {
    imgUrl:'404-page.png',
    subHeader :'Oops! Why you’re here?',
    details: 'We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.',
  },
};
