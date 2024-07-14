import { NextResponse } from "next/server";
import { ethers } from "ethers";
import externalContracts from "~~/contracts/externalContracts";

// Inco Network configuration
const incoChain = {
  id: 9090,
  network: "Inco Network",
  name: "Inco",
  nativeCurrency: {
    name: "IncoEther",
    symbol: "INCO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.inco.org/"],
    },
    public: {
      http: ["https://testnet.inco.org"],
    },
  },
};

const mnemonic = "spider inherit minute bring festival file duck discover birth power carbon adult";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!ethers.isAddress(id)) {
      return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
    }

    // Set up provider and wallet
    const provider = new ethers.JsonRpcProvider(incoChain.rpcUrls.default.http[0]);

    if (!mnemonic) {
      return NextResponse.json({ message: "Server configuration error: Missing mnemonic" }, { status: 500 });
    }

    const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(provider);

    // The contract is stored inside of externalContracts
    const contractAddress = externalContracts[9090].RandomPhotoFactory.address;

    const abi = externalContracts[9090].RandomPhotoFactory.abi;

    // Create a contract instance with a signer
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
      // Call the getRandomPhotoResult function
      const tx = await contract.getRandomPhotoResult(id);

      // Wait for the transaction to be mined
      await tx.wait();

      const res = await contract.readResult();

      return NextResponse.json(
        {
          message: "Random photo result",
          randomPhotoResult: res.toString(),
          id: id,
        },
        { status: 200 },
      );
    } catch (contractError) {
      console.error("Contract execution error:", contractError);
      return NextResponse.json({ message: "Error in contract execution", error: contractError }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating random photo result:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
