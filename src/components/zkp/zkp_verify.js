import React, { useState } from 'react';
import './zkp.css';
import CryptoJS from 'crypto-js';

function Zkp_verify() {
  const [leafHash, setLeafHash] = useState('');
  const [merklePath, setMerklePath] = useState('');
  const [rootHash, setRootHash] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const path = merklePath.split(',').map((item) => item.trim());
    const isValid = verifyMerklePath(leafHash, path, rootHash);
    setResult(isValid);
  };

  const verifyMerklePath = (leafHash, path, rootHash) => {
    let currentHash = leafHash;
    for (const node of path) {
      currentHash = CryptoJS.SHA256(currentHash + node).toString();
    }
    return currentHash === rootHash;
  };

  return (
    <div className="App">
      <h1>Merkle Tree Verifier</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Leaf Hash:
          <input
            type="text"
            value={leafHash}
            onChange={(e) => setLeafHash(e.target.value)}
          />
        </label>
        <label>
          Merkle Path (comma-separated):
          <input
            type="text"
            value={merklePath}
            onChange={(e) => setMerklePath(e.target.value)}
          />
        </label>
        <label>
          Root Hash:
          <input
            type="text"
            value={rootHash}
            onChange={(e) => setRootHash(e.target.value)}
          />
        </label>
        <button type="submit">Verify</button>
      </form>
      <br></br>
      {result !== null && (
        <h3>{result ? '验证通过' : '验证失败'}</h3>
      )}
    </div>
  );
}

export default Zkp_verify;
