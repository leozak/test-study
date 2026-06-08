// import type { Preview } from '@storybook/nextjs-vite'

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//        color: /(background|color)$/i,
//        date: /Date$/i,
//       },
//     },

//     a11y: {
//       // 'todo' - show a11y violations in the test UI only
//       // 'error' - fail CI on a11y violations
//       // 'off' - skip a11y checks entirely
//       test: 'todo'
//     }
//   },
// };

// export default preview;

import React from "react";
import type { Preview } from "@storybook/react";

import "../src/app/globals.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // { name: 'dark', value: '#000000' },
        { name: "light", value: "ffffff" },
      ],
      default: "light",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default preview;
