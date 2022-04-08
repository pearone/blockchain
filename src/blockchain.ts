/**
 * 区块链
 * 生成，新增，校验
 * 交易
 * 非对称加密
 * 挖矿
 * p2p网络
 */

import {createHmac} from "crypto";


/**
 * index: 索引
 * timestamp: 时间戳
 * data: 区块的具体信息（交易信息）
 * hash: 当前区块的hash
 * prevhash: 上一个区块的hash
 * nonce: 随机数
 */
interface BlockType {
    index: number;
    timestamp: number;
    data: any;
    hash: string;
    prevhash: string;
    nonce: string;
}

export class Blockchain {
    blockchain: BlockType[];
    difficuty: number;

    constructor() {
        this.blockchain = [];
        this.difficuty = 2;
        this.mine(this.blockchain.length, "0", "hello, pear-chain")
    }

    /**
     * 挖矿
     */
    mine(index: number, prevhash: string, data: string) {
        while (true) {
            const nonce = (Math.random() * Math.pow(10, this.difficuty)).toFixed(0);
            const timestamp = new Date().getTime();
            const hash = this.computeHash(index, prevhash, timestamp, data, nonce);
            if (hash.slice(0, this.difficuty) === "0".repeat(this.difficuty)) {
                const block = {
                    index: index,
                    hash: hash,
                    prevhash: prevhash,
                    timestamp: timestamp,
                    data: data,
                    nonce: nonce
                }
                console.log(block)
                this.blockchain.push(block)
                break;
            }
        }
    }

    /**
     * 新建一个区块
     */
    genCreateBlock() { }

    /**
     * 计算hash
     */
    computeHash(
        index: number,
        prevhash: string,
        timestamp: number,
        data: string,
        nonce: string
    ) {
        const secret = 'abcdefg';

        return createHmac("sha256", secret)
            .update(index + prevhash + timestamp + data + nonce)
            .digest("hex");
    }

    /**
     * 校验合法性
     */
    isValidBlock() { }

    /**
     * 全链条校验
     */
    isValidChain() { }
}

