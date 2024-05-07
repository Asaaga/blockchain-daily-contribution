let hash = require('object-hash');
const validator = require('./validator');

const TARGET_HASH = hash(1560);

let mongoose = require('mongoose');

let blockChainModel = mongoose.model('BlockChain');

class BlockChain {
  constructor() {
    //Create
    this.chain = [];
    //Transaction
    this.curr_transactions = [];
  }

  getLastBlock(callback) {
    // Get last block from DB
    return blockChainModel
      .findOne()
      .sort({ _id: -1 })
      .limit(1)
      .then((block) => {
        return callback(block);
      })
      .catch((err) => console.log("can't find last block", err));
  }

  addNewBlock(prevHash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.curr_transactions,
      prevHash: prevHash,
    };

    if (validator.proofOfWork() == TARGET_HASH) {
      block.hash = hash(block);

      this.getLastBlock((lastBlock) => {
        if (lastBlock) {
          block.prevHash = lastBlock.hash;
        }
        // create a new instance and save the block in the db
        let newBlock = new blockChainModel(block);
        newBlock
          .save()
          .then(() => console.log('block save!!'))
          .catch((err) => console.log('an error occured!!', err));
        //Add to chain
        this.chain.push(block);
        this.curr_transactions = [];
        return block;
      });
    }
  }

  addNewTransaction(sender, receipient, amount) {
    this.curr_transactions.push({ sender, receipient, amount });
  }

  lastBock() {
    return this.chain.slice(-1)[0];
  }

  isEmpty() {
    return this.chain.length == 0;
  }
}

module.exports = BlockChain;
