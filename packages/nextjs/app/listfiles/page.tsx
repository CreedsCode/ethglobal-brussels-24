"use client";

import lighthouse from "@lighthouse-web3/sdk";

//Here you can find all the uploads that have been done.

function App() {
  const getUploads = async () => {
    /*
        @param {string} apiKey - Your API key.
        @param {number} [lastKey=null] - id of last object of previous response, defaults to null.
      */
    try {
      const response = await lighthouse.getUploads(process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_API_KEY as string);
      console.log(response);
    } catch (error) {
      // Handle errors, e.g., if the CID is invalid or the network is down
      console.error("Error fetching file info:", error);
    }

    /* Sample response
        {
          data: {
            fileList: [
              {
                publicKey: '0x4e6d5be93ab7c1f75e30dd5a7f574f42f675eed3',
                fileName: 'sample.txt',
                mimeType: 'text/plain',
                txHash: '',
                status: 'queued',
                createdAt: 1691087810426,
                fileSizeInBytes: '14',
                cid: 'QmQK9V46b4vpNUd7pe7EcCqihBEmcSLH4NVNWukLJhGzgN',
                id: '1b2623bd-64ca-4434-8619-24c9a1eca840',
                lastUpdate: 1691087810426,
                encryption: false
              }
            ]
          }
        }
      */
  };
  return (
    <div className="App">
      <button onClick={getUploads}>getAllUploads</button>
    </div>
  );
}
export default App;
