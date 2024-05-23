const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previosHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previosHash = previosHash;

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  
  }
  //первый блок
  createGenesisBlock() {
    return new Block(0, "01/01/2024", "Genesis Block", "0");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previosHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previosHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  
  }
  
}

let blockchain = new Blockchain();

blockchain.addBlock(new Block(1, "23/05/2024", "First Block", {
  amout: 10,
}));
blockchain.addBlock(new Block(2, "24/05/2024", "First Block", {
  amout: 100,
}));


console.log(`Is blockchain valid? ${blockchain.isChainValid()}`);

blockchain.chain[1].data = { amout: 1000, };

console.log(`Is blockchain valid? ${blockchain.isChainValid()}`);
// console.log(JSON.stringify(blockchain, null, 2));