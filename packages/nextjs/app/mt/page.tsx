"use client";

import React, { useEffect, useState } from "react";
import { PrivateKeyAccount, encodeFunctionData } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { useDeployedContractInfo, useScaffoldReadContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

export default function CreateFundraisePage() {
  const { targetNetwork } = useTargetNetwork();
  const [wallet, setWallet] = useState<PrivateKeyAccount | null>(null);
  const [privateKey, setPrivateKey] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [nftImageURIs, setNftImageURIs] = useState<string[]>([]);

  const { data: fundraiseContractData } = useDeployedContractInfo("Fundraise");

  useEffect(() => {
    const _privateKey = generatePrivateKey();
    setPrivateKey(_privateKey);
    const account = privateKeyToAccount(_privateKey);
    console.log(privateKey);
    setWallet(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: nonce } = useScaffoldReadContract({
    contractName: "Fundraise",
    functionName: "nonces",
    args: [wallet?.address as `0x${string}`],
    enabled: !!wallet,
  });

  const handleTxSubmission = async () => {
    setIsSubmitting(true);

    if (!wallet) {
      console.error("Wallet not found");
      setIsSubmitting(false);
      return;
    }

    try {
      const functionSignature = encodeFunctionData({
        abi: fundraiseContractData?.abi,
        functionName: "createFundraise",
        args: [title, description, fundingGoal, duration, nftName, nftSymbol, nftImageURIs],
      });

      const metaTransaction = {
        nonce: BigInt(nonce?.toString() || "0"),
        from: wallet.address,
        functionSignature: functionSignature,
      };

      const signature = await wallet.signTypedData({
        domain: {
          name: "Fundraise",
          version: "1",
          chainId: BigInt(targetNetwork?.id?.toString() || "0"),
          verifyingContract: fundraiseContractData?.address as `0x${string}`,
        },
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          MetaTransactionStruct: [
            { name: "nonce", type: "uint256" },
            { name: "from", type: "address" },
            { name: "functionSignature", type: "bytes" },
          ],
        },
        primaryType: "MetaTransactionStruct",
        message: metaTransaction,
      });

      const response = await fetch("/api/create-fundraise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            metaTransaction,
            signature,
            chainId: targetNetwork?.id?.toString(),
          },
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
        ),
      });

      if (response.ok) {
        console.log("Fundraise created successfully");
      } else {
        console.error("Error creating fundraise");
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating fundraise:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Fundraise</h1>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter fundraise title"
          className="input input-bordered"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter fundraise description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Funding Goal</span>
        </label>
        <input
          type="number"
          placeholder="Enter funding goal"
          className="input input-bordered"
          value={fundingGoal}
          onChange={e => setFundingGoal(e.target.value)}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Duration (in seconds)</span>
        </label>
        <input
          type="number"
          placeholder="Enter duration"
          className="input input-bordered"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">NFT Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter NFT name"
          className="input input-bordered"
          value={nftName}
          onChange={e => setNftName(e.target.value)}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">NFT Symbol</span>
        </label>
        <input
          type="text"
          placeholder="Enter NFT symbol"
          className="input input-bordered"
          value={nftSymbol}
          onChange={e => setNftSymbol(e.target.value)}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">NFT Image URIs</span>
        </label>
        <input
          type="text"
          placeholder="Enter NFT image URIs (comma-separated)"
          className="input input-bordered"
          value={nftImageURIs.join(",")}
          onChange={e => setNftImageURIs(e.target.value.split(","))}
        />
      </div>
      <button
        className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
        onClick={handleTxSubmission}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Fundraise..." : "Create Fundraise"}
      </button>
    </div>
  );
}
