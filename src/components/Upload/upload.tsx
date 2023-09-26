/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, ChangeEvent } from "react";
import axios from "axios";
import Button from "../Button";

export interface UploadProps {
  action: string;
  onProgress?: (percent: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemove?: (file: File) => void;
  onChange?: (file: File) => void;
  children?: React.ReactNode;
}

export const Upload: FC<UploadProps> = props => {
  const { action, onProgress, onError, onSuccess } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files); // 转数组
    postFiles.forEach(file => {
      const formData = new FormData(); // 使用FormData获取文件数据
      formData.append(file.name, file);
      // 使用axios第三方库进行文件上传
      axios
        .post(action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // 上传进度函数, axios提供
          onUploadProgress: e => {
            if (typeof e.total === "undefined") return;
            const percent = Math.round((e.loaded * 100) / e.total) || 0;
            if (percent < 100) {
              if (onProgress) {
                // 执行传入的onProgress
                onProgress(percent, file);
              }
            }
          },
        })
        .then(res => {
          // 执行上传成功函数：onSuccess
          if (onSuccess) {
            onSuccess(res.data, file);
          }
        })
        .catch(err => {
          // 执行上传失败函数;onError
          if (onError) {
            onError(err, file);
          }
        });
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取上传的文件
    const files = e.target.files;
    // 如果不存在，则直接return
    if (!files) return;
    // 处理文件上传
    uploadFiles(files);

    // 清空文件
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>上传</Button>
      <input
        onChange={handleFileChange}
        ref={fileInput}
        type="file"
        className="curry-file-input"
        style={{ display: "none" }}
      />
    </div>
  );
};
