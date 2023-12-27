import React, { useState, useEffect } from "react";
import { Image } from "antd";
import "./Avatar.css";
import ImgCrop from "antd-img-crop";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AvatarProfile = () => {
  const [imageSrc, setImageSrc] = useState(
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  );

  const handleImageChange = (fileList) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="border-3 border-slate-300 p-1 rounded-full flex mdl:flex-col justify-center mx-auto">
        <Image
          width={160}
          style={{ borderRadius: "100%", objectFit: "cover" }}
          src={imageSrc}
        />
      </div>
      <div className="flex mdl:flex-col justify-center mx-auto">
        <ImgCrop rotationSlider>
          <Upload
            onChange={(info) => {
              if (info.fileList.length > 0) {
                handleImageChange([info.file.originFileObj]);
              }
            }}
            showUploadList={false}
          >
            <div className="border-2 border-slate-300 rounded-md inline-block mb-3 ">
              <Button
                style={{
                  backgroundColor: "#D1D5DB",
                  color: "#4B5563",
                  boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.2)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  height: "37px",
                }}
                icon={<UploadOutlined style={{ marginBottom: "8px" }} />}
              >
                Change Avatar
              </Button>
            </div>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default AvatarProfile;
