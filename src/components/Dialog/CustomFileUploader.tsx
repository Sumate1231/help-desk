import { Button } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export function ShowFilesName({files}:any) {

  return <div>
    
  </div>;
}

export default function CustomFileUploader() {
  const [files, setFile] = React.useState([]);

  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <div>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label="เลือก หรือลากไฟล์มาวาง"
      />
      <div></div>
      <ShowFilesName/>
    </div>
  );
}
