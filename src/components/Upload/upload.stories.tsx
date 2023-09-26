import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "./upload";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Upload",
  component: Upload,
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
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

// 检查文件大小
// const checkFileSize = (file: File) => {
//   if(Math.round(file.size / 1024) > 50){
//     alert('文件太大')
//     return false;
//   }
//   return true;
// }
// promise类型
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', { type: file.type})
//   return Promise.resolve(newFile)
// }

export const Default: Story = {
  args: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  },
  render: () => (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("change")}
      name="file-name"
      data={{ key: 1 }}
      headers={{ "X-Author": "curry" }}
      accept=".jpg"
      // beforeUpload={checkFileSize}
      // beforeUpload={filePromise}
    />
  ),
};
