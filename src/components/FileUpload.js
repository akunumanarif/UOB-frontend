import React, { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
