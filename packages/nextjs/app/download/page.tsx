"use client";

import React, { useState } from "react";

//Here you can Download any NFT, by supplying it's CID and a (download-)name

export default function Download() {
  const [cid, setCID] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleCIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCID(e.target.value);
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const downloadFile = async () => {
    if (!cid) {
      alert("Please enter a CID.");
      return;
    }
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }
    setDownloadStatus("Downloading..."); // Show a download status message

    try {
      const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Use the provided filename
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      setDownloadStatus("Download complete!");
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloadStatus("Error downloading file"); // Set error message
    }
  };

  return (
    <div>
      <input type="text" value={cid} onChange={handleCIDChange} placeholder="Enter CID" />
      <input type="text" value={fileName} onChange={handleFileNameChange} placeholder="Enter File Name" />
      <button onClick={downloadFile} disabled={!cid || !fileName}>
        Download
      </button>
      {downloadStatus && <p>{downloadStatus}</p>}
    </div>
  );
}
