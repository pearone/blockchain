/**
 * 区块链
 * 生成，新增，校验
 * 交易
 * 非对称加密
 * 挖矿
 * p2p网络
 */

import { createHmac } from 'crypto';

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
        this.blockchain = [
            {
                index: 0,
                hash: '005089fc240e933d891891dc13029370f7214f6c4aa1d6d0719eea6e25d11c07',
                prevhash: '0',
                timestamp: 1649482442321,
                data: 'hello, pear-chain',
                nonce: '84'
            }
        ];
        this.difficuty = 2;
    }

    /**
     * 挖矿
     */
    mine() {
        const data = {
            index: this.blockchain.length,
            prevhash: this.getLastBlock().hash,
            data: 'hello, pear-chain'
        };

        const new_block = this.genCreateBlock(data);
        if (this.isValidBlock(new_block)) {
            this.blockchain.push(new_block);
        } else {
            console.error('Error, Invalid block', new_block);
        }
    }

    /**
     * 创建一个block
     */
    genCreateBlock({
        index,
        prevhash,
        data
    }: {
        index: number;
        prevhash: string;
        data: string;
    }): BlockType {
        while (true) {
            const nonce = (
                Math.random() * Math.pow(10, this.difficuty)
            ).toFixed(0);
            const timestamp = new Date().getTime();
            const hash = this.computeHash(
                index,
                prevhash,
                timestamp,
                data,
                nonce
            );
            if (hash.slice(0, this.difficuty) === '0'.repeat(this.difficuty)) {
                const block = {
                    index: index,
                    hash: hash,
                    prevhash: prevhash,
                    timestamp: timestamp,
                    data: data,
                    nonce: nonce
                };
                return block;
            }
        }
    }

    getLastBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

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

        return createHmac('sha256', secret)
            .update(index + prevhash + timestamp + data + nonce)
            .digest('hex');
    }

    /**
     * 校验合法性
     * 1.区块的index等于最新区块的index+1
     * 2.区块的time大于最新区块
     * 3.最新区块的prevHash等于最新区块的hash
     * 4.区块的hash值满足难度要求
     */
    isValidBlock(new_block: BlockType) {
        const last_block = this.getLastBlock();
        if (new_block.index !== last_block.index + 1) {
            console.log('errorCode', 1);
            return false;
        }
        if (new_block.timestamp <= last_block.timestamp) {
            console.log('errorCode', 2);
            return false;
        }
        if (new_block.prevhash !== last_block.hash) {
            console.log('errorCode', 3);
            return false;
        }
        if (
            new_block.hash.slice(0, this.difficuty) !==
            '0'.repeat(this.difficuty)
        ) {
            console.log('errorCode', 4);
            return false;
        }
        return true;
    }

    /**
     * 全链条校验
     */
    isValidChain() {}
}
