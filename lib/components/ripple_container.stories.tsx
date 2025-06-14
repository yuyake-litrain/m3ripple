import type { Meta, StoryObj } from '@storybook/react';

import RippleContainer from './ripple_container';

const meta: Meta<typeof RippleContainer> = {
  component: RippleContainer,
};

export default meta;

type Story = StoryObj<typeof RippleContainer>;

export const Primary: Story = {
  args: {},
};
