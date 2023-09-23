import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Menu",
  component: Menu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultMenu = () => (
  <Menu
    defaultIndex="0"
    onSelect={index => {
      action(`clicked ${index} item`);
    }}
  >
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
  </Menu>
);
export const Default: Story = {
  render: () => <DefaultMenu />,
};

const DefaultMenuDom = () => (
  <Menu defaultIndex="0" defaultOpenSubMenus={["2"]} onSelect={e => alert(e)}>
    <MenuItem>aaa</MenuItem>
    <MenuItem>bbb</MenuItem>
    <SubMenu title="aaa">
      <MenuItem>ccc</MenuItem>
      <MenuItem>ddd</MenuItem>
    </SubMenu>
  </Menu>
);
export const subMenu: Story = {
  render: () => <DefaultMenuDom />,
};
