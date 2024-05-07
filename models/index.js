let mongoose = require('mongoose');
let BlockChainModel = require('./transaction');
mongoose
  .connect('mongodb://127.0.0.1:27017/blockChain')
  .then(() => {
    console.log('db connected successfully');
    connectionCallback();
  })
  .catch(() => {
    console.log('error mongodb');
  });

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
  connectionCallback = callback;
};
