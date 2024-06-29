//This is to show that you can create stories for pages that you haven't overloaded.

import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const pageId = "login-verify-email.ftl";

const { PageStory } = createPageStory({
  pageId,
});

const meta = {
  title: "login/LoginResetPassword",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />,
};

export const WithEmailAsUsername: any = {
  title: `login/${pageId}`,
  component: PageStory,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
  },
};
