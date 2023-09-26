/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import Dragger from "./dragger";
import UploadList from "./uploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percent: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemove?: (file: UploadFile) => void;
  onChange?: (file: File) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  children?: React.ReactNode;
}

export const Upload: FC<UploadProps> = props => {
  const {
    children,
    action,
    accept,
    multiple,
    drag,
    headers,
    name,
    data,
    withCredentials,
    defaultList,
    onRemove,
    beforeUpload,
    onProgress,
    onError,
    onSuccess,
    onChange,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultList || []);

  // 更新file list
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files); // 转数组
    postFiles.forEach(file => {
      // 没有 beforeUpload
      if (!beforeUpload) {
        post(file);
      } else {
        // 有 beforeUpload
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList(prevList => {
      return [_file, ...prevList];
    });
    const formData = new FormData(); // 使用FormData获取文件数据
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    // 使用axios第三方库进行文件上传
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        // 上传进度函数, axios提供
        onUploadProgress: (e: any) => {
          if (typeof e.total === "undefined") return;
          const percent = Math.round((e.loaded * 100) / e.total) || 0;
          if (percent < 100) {
            updateFileList(_file, { percent, status: "uploading" });
            if (onProgress) {
              // 执行传入的onProgress
              onProgress(percent, file);
            }
          }
        },
      })
      .then((res: any) => {
        updateFileList(_file, { status: "success", response: res.data });
        // 执行上传成功函数：onSuccess
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        onChange && onChange(file);
      })
      .catch((err: any) => {
        updateFileList(_file, { status: "error", error: err });
        // 执行上传失败函数;onError
        if (onError) {
          onError(err, file);
          onChange && onChange(file);
        }
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
  console.log("file", fileList);

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  return (
    <div className="curry-upload-component">
      <div className="curry-upload-input" style={{ display: "inline-block" }} onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={files => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="curry-file-input"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
    // <div>
    //   <Button onClick={handleClick}>上传</Button>
    //   <input
    //     onChange={handleFileChange}
    //     ref={fileInput}
    //     type="file"
    //     className="curry-file-input"
    //     style={{ display: "none" }}
    //     accept={accept}
    //     multiple={multiple}
    //   />
    //   <UploadList
    //     fileList={fileList}
    //     onRemove={handleRemove}
    //   />
    // </div>
  );
};

Upload.defaultProps = {
  name: "file",
};
export default Upload;
