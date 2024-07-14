"use client";

import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";

//Here you can get fileinfo (MetaData) of any NFT stored using Lighthouse, by inputting it's CID

function App() {
  const [cid, setCID] = useState("");

  const fileInfo = async (cid: string) => {
    /*
        @param {string} cid - cid of file.
        */
    try {
      const fileInfo = await lighthouse.getFileInfo(cid);
      console.log(fileInfo);
    } catch (error) {
      // Handle errors, e.g., if the CID is invalid or the network is down
      console.error("Error fetching file info:", error);
    }
    /* Sample Response
        {
            data: {
            fileSizeInBytes: '95077',
            cid: 'QmeMsykMDyD76zpAbinCy1cjb1KL6CVNBfB44am15U1XHh',
            encryption: false,
            fileName: 'itachi.jpg',
            mimeType: 'image/jpeg',
            txHash: ''
            }
        }
        */
  };
  const handleGetFileInfoClick = async () => {
    await fileInfo(cid); // Call fileInfo with the current CID
  };

  return (
    <div className="App">
      <input type="text" value={cid} onChange={e => setCID(e.target.value)} placeholder="Enter CID" />
      <button onClick={handleGetFileInfoClick}>getFileInfo</button>
    </div>
  );
}
export default App;
