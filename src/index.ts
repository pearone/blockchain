import { Blockchain } from './blockchain.js';

const myChain = new Blockchain();
myChain.mine();
myChain.mine();
myChain.mine();
myChain.mine();

console.log(myChain.blockchain);
