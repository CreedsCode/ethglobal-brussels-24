"use client";

import React from "react";
import lighthouse from "@lighthouse-web3/sdk";

function App() {
  const progressCallback = (progressData: any) => {
    const percentageDone = 100 - +(progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file: any) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(
      file,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_API_KEY as string,
      true,
      undefined,
      progressCallback,
    );
    console.log("File Status:", output);
    /*  
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */
    for (let i = 0; i < output.data.length - 1; i++) {
      console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data[i].Hash);
    }
  };

  return (
    <div className="App">
      <input onChange={e => uploadFile(e.target.files)} type="file" multiple />
    </div>
  );
}

export default App;
