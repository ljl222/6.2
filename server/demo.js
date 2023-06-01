// 在 Node.js 中，可以使用 `fs` 模块来进行文件操作，使用 `crypto` 模块来进行哈希计算，从而实现文件分片和生成 Merkle 树。

// 下面是一个简单的例子，演示如何将一个文件分成多个固定大小的块，并生成 Merkle 树。


const fs = require('fs');
const crypto = require('crypto');

// 将文件分成固定大小的块
function splitFile(filePath, blockSize) {
  const fileContent = fs.readFileSync(filePath);
  const fileSize = fileContent.length;
  const blockCount = Math.ceil(fileSize / blockSize);
  const blocks = [];

  for (let i = 0; i < blockCount; i++) {
    const start = i * blockSize;
    const end = Math.min(start + blockSize, fileSize);
    const block = fileContent.slice(start, end);
    blocks.push(block);
  }

  return blocks;
}

// 生成 Merkle 树
function buildMerkleTree(blocks) {
  const leafNodes = blocks.map(block => crypto.createHash('sha256').update(block).digest('hex'));
  const nodes = [...leafNodes];

  while (nodes.length > 1) {
    const newNodes = [];

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = (i + 1 < nodes.length) ? nodes[i + 1] : '';
      const combined = crypto.createHash('sha256').update(left + right).digest('hex');
      newNodes.push(combined);
    }

    nodes.splice(0, nodes.length, ...newNodes);
  }

  return nodes[0];
}

// 将 Merkle 树写入文件
function writeMerkleTreeToFile(merkleRoot, filePath) {
  fs.writeFileSync(filePath, merkleRoot);
}

// 将文件分成固定大小的块，并生成 Merkle 树
function generateMerkleTree(filePath, blockSize, merkleTreeFilePath) {
  const blocks = splitFile(filePath, blockSize);
  const merkleRoot = buildMerkleTree(blocks);
  writeMerkleTreeToFile(merkleRoot, merkleTreeFilePath);
}

// 示例：将文件 "test.txt" 分成大小为 1024 字节的块，并生成 Merkle 树
generateMerkleTree('test.txt', 1024, 'merkle-tree.txt');


