import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
    9090: {
      RandomPhotoFactory: {
        address: "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650",
        abi: [
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "id",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            name: "RandomPhotoCreated",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "id",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint16",
                name: "result",
                type: "uint16",
              },
            ],
            name: "RandomPhotoGen",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "photoN",
                type: "uint16",
              },
            ],
            name: "createRandomPhoto",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
            ],
            name: "getRandomPhotoContract",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
            ],
            name: "getRandomPhotoResult",
            outputs: [
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "randomPhotoContracts",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "readResult",
            outputs: [
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "result",
            outputs: [
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        inheritedFunctions: {},
      },
    },
  } as const;
  
export default externalContracts satisfies GenericContractsDeclaration;
