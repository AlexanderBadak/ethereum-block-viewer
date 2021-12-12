import Web3 from 'web3'
import {Subscription} from 'web3-core-subscriptions'
import { BlockHeader, BlockTransactionString, Transaction } from 'web3-eth'

export interface IWeb3Service {
    getLatestBlock: () => Promise<BlockTransactionString>
    getBlockByBlockNumber: (blockNumber: number) => Promise<BlockTransactionString>
    subscribeToBlockchain: (callback: (error: Error, blockHeader: BlockHeader) => void) => void
    unsubscribeFromBlockchain: () => void
    getTransactionsDetails: (transactionIds: string[]) => Promise<Transaction[]>
}

class Web3Service implements IWeb3Service {
    constructor(wss: string) {
        this.web3 = new Web3(wss)
    }
    private web3
    private subscription?: Subscription<BlockHeader>

    public getLatestBlock = async () => {
        const blockNumber = await this.web3.eth.getBlockNumber()
        return this.getBlockByBlockNumber(blockNumber)
    }

    public getBlockByBlockNumber = async (blockNumber: number) =>
        await this.web3.eth.getBlock(blockNumber)

    public subscribeToBlockchain = (callback: (error: Error, blockHeader: BlockHeader) => void) => {
        if (!this.subscription) {
            this.subscription = this.web3.eth.subscribe('newBlockHeaders', callback)
        } else {
            this.subscription.subscribe(callback)
        }
    }

    public unsubscribeFromBlockchain = () => {
        this.subscription?.unsubscribe()
    }

    public getTransactionsDetails = async (transactionHashes: string[]) => {
        const promises: Promise<Transaction>[] = []
        for (const transactionHash of transactionHashes) {
            const promise = this.web3.eth.getTransaction(transactionHash)
            promises.push(promise)
        }

        const transactions = await Promise.all(promises)

        const filtered = transactions.filter(t => !!t)
        return filtered
    }
}

export const web3Service = new Web3Service('wss://mainnet.infura.io/ws/v3/0565f3540f764682a26fcfc49cdce78a')