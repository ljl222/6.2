import React, { useRef, useState } from "react";
import CryptoJS from "crypto-js";

const FileChunkerAndMerkleTree = () => {
  const fileInput = useRef(null);
  const [merkleRoot, setMerkleRoot] = useState(null);
  const [proof, setProof] = useState([]);

  const getFileChunks = (file, chunkSize) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunks = [];

    for (let i = 0; i < totalChunks; i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min(file.size, startByte + chunkSize);
      chunks.push(file.slice(startByte, endByte));
    }

    return chunks;
  };

  const generateMerkleTree = (hashes, targetNodeIndex = 0) => {
    if (hashes.length === 1) {
      return {
        root: hashes[0],
        proof: [],
      };
    }

    const newHashes = [];
    let hash1,hash2;
    for (let i = 0; i < hashes.length; i += 2) {
      hash1 = hashes[i];
      hash2 = hashes[i + 1] || hashes[i]; // If odd number of hashes, duplicate the last hash
      const combinedHash = CryptoJS.SHA256(hash1 + hash2);
      newHashes.push(combinedHash.toString());
    }

    const { root, proof } = generateMerkleTree(newHashes, Math.floor(targetNodeIndex / 2));

    if (targetNodeIndex % 2 === 0) {
      // node is a left child
      proof.unshift(hash2);
    } else {
      // node is a right child
      proof.unshift(hash1);
    }

    return {
      root,
      proof,
    };
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024; // 1MB
    const chunks = getFileChunks(file, chunkSize);
    const hashes = chunks.map((chunk) => CryptoJS.SHA256(chunk).toString());
    const { root, proof } = generateMerkleTree(hashes);
    setMerkleRoot(root);
    setProof(proof);
  };

  const handleGenerateButtonClick = () => {
    if (!fileInput.current.files[0]) {
      alert("Please select a file first.");
      return;
    }
    fileInput.current.click();
  };

  const handleVerifyButtonClick = () => {
    if (!merkleRoot || !proof.length) {
      alert("Please select a file and generate a Merkle tree first.");
      return;
    }

    const leafNodeHash = CryptoJS.SHA256(fileInput.current.files[0]);
    let currentNodeHash = leafNodeHash.toString();

    for (let i = 0; i < proof.length; i++) {
      const proofElement = proof[i];

      if (currentNodeHash === proofElement) {
        currentNodeHash = CryptoJS.SHA256(currentNodeHash + proofElement).toString();
      } else {
        currentNodeHash = CryptoJS.SHA256(proofElement + currentNodeHash).toString();
      }
    }

    const isVerified = currentNodeHash === merkleRoot;
    alert(`File verification result: ${isVerified}`);
  };

  return (
    <div>
      <input type="file" accept="application/pdf, text/plain, application/msword" ref={fileInput} onChange={handleFileInputChange } />
      {merkleRoot && (
        <div>
          <h3>Merkle Root:</h3>
          <p>{merkleRoot}</p>
        </div>
      )}

      {proof.length > 0 && (
        <div>
          <h3>Leaf:</h3>
          <ul>
            
              <li>{proof[0]}</li>
            
          </ul>
        </div>
      )}

      {proof.length > 0 && (
        <div>
          <h3>Proof:</h3>
          <ul>
            {proof.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileChunkerAndMerkleTree;
//实现了处理文件输入、生成Merkle树、校验文件等功能的事件处理程序。`handleFileInputChange`函数接收文件输入事件并将文件分成块，然后计算每个块的哈希值，并使用`generateMerkleTree`函数生成Merkle树和校验证明。它最终将根节点哈希值和证明存储在状态变量中。

// `handleGenerateButtonClick`函数会检查是否存在文件，并通过模拟点击文件输入按钮来触发文件输入事件。

// `handleVerifyButtonClick`函数将使用根节点哈希值和证明来验证文件。它将计算文件的叶节点哈希值，并遍历证明数组，使用哈希函数将当前节点哈希值和证明元素组合成新的哈希值。最终，它将检查生成的哈希值是否与根节点哈希值相同，并将结果作为弹窗显示。

// 最后，组件将返回一个包含文件输入、生成Merkle树、校验文件等功能的UI。如果Merkle树已经生成，则会显示根节点哈希值和证明，否则非常抱歉，似乎我的回答仍然被截断了。以下是完整的代码的第四部分（接上文）：



