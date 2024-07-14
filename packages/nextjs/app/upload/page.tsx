"use client";

import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";

//Here you can upload NFTs to Lighthouse, you NEED to provide a title, description, funding Goal, NFT Symbol and
//the files you want to upload (multiple allowed).

//Useful variables <-> Smart Contract:
//title <-> _title
//description <-> _description
//fundingGoal <-> _fundingGoal
//symbol <-> _nftSymbol
//_nftImageURIS <-> _nftImageURIS <- Array of all CIDs
//(10 files -> 10 CIDs, but only ONE -> title, description, funding goal, symbol)

function App() {
  const progressCallback = (progressData: any) => {
    const percentageDone = 100 - +(progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const [file, setFile] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState<number | null>(null);
  //const [errorMessage, setErrorMessage] = useState(''); // For error messages
  const [symbol, setSymbol] = useState("");
  const _nftImageURIS: string[] = [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFile(files);
  };

  const handleFundingGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFundingGoal(value === "" ? null : Number(value)); // Set null if empty
  };

  const uploadFile = async () => {
    if (!file || file.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    if (!title) {
      alert("Please enter a title.");
      return;
    }

    if (!description) {
      alert("Please add a description.");
      return;
    }

    if (fundingGoal === null || isNaN(fundingGoal)) {
      alert("Please enter a valid funding goal (a number).");
      return;
    }
    if (!symbol) {
      alert("Please enter a symbol.");
      return;
    }

    const output = await lighthouse.upload(
      file, // Upload the raw File objects, not the fileWithTitle objects
      process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_API_KEY as string,
      true,
      undefined,
      progressCallback,
    );
    console.log("File Status:", output);

    for (let i = 0; i < output.data.length - 1; i++) {
      //Numbering within console log
      const j = i + 1;
      console.log("Visit Image " + j + " at https://gateway.lighthouse.storage/ipfs/" + output.data[i].Hash);
      _nftImageURIS.push(output.data[i].Hash); // Add the full IPFS gateway URL to the array
    }
    console.log("Title:", title); // Log the title for each file
    console.log("Description:", description);
    console.log("Symbol:", symbol);

    // Convert fundingGoal to Wei for the smart contract
    const fundingGoalWei = ethers.parseUnits(fundingGoal.toString(), "ether");
    console.log("Funding Goal (Wei):", fundingGoalWei.toString());
    console.log("NFT Image URIs:", _nftImageURIS); // Log the updated array
  };

  return (
    <div className="App">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter Description"
      />
      <input
        type="number"
        value={fundingGoal ?? ""}
        onChange={handleFundingGoalChange}
        placeholder="Funding Goal [ETH]"
      />
      <input type="text" value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Enter Symbol" />
      <input onChange={handleFileChange} type="file" multiple />
      <button onClick={uploadFile} disabled={!file || !title || !fundingGoal || !symbol || isNaN(Number(fundingGoal))}>
        Upload
      </button>
    </div>
  );
}

export default App;
