import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { themes } from '@storybook/theming';
import docJson from '../documentation.json';
import '!style-loader!css-loader!sass-loader!../src/styles.scss';
import '!style-loader!css-loader!./global.css';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // storySort: {
    //   order: ['Atom', 'Molecules', 'Organism', 'Pages', 'Layout'],
    // },
    docs: {
      theme: themes.light,
    },
    // global: {
    //   css: `
    //     .sidebar-header {
    //       background-color: #f2f2f2 !important;
    //     }
  
    //     .myButton {
    //       background-color: blue;
    //       color: white;
    //       padding: 10px 20px;
    //       border-radius: 4px;
    //     }
    //   `,
    // },
    // options: {
    //   storySort: (a: any, b: any) =>
    //     a.id === b.id
    //       ? 0
    //       : a.id.localeCompare(b.id, undefined, { numeric: true }),
    // },
  },
};

export default preview;
