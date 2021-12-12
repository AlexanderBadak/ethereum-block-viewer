import React, { useState } from 'react'
import { web3Service } from 'services/web3-service'
import { BlockHeader, BlockTransactionString, Transaction } from 'web3-eth'

export interface IUseWeb3Api {
    latestBlock?: BlockTransactionString
    fetch: () => Promise<void>
    subscribe: () => void
    unsubsribe: () => void
    getTransactionsDetails: (transactionHashes: string[]) => Promise<Transaction[]>
}

const useWeb3Api = () : IUseWeb3Api => {
    const [latestBlock, setLatestBlock] = useState<BlockTransactionString>()
    
    const onNewBlockHeader = async (error: Error, blockHeader: BlockHeader) => {
        const block = await web3Service.getBlockByBlockNumber(blockHeader.number)
        setLatestBlock(block)
    }

    const unsubscribeFromBlockchain = () => {
        web3Service.unsubscribeFromBlockchain()
    }

    const subscribeToBlockchain = () => {
        web3Service.subscribeToBlockchain(onNewBlockHeader)
    }

    const fetchBlockchainData = async () => {
        const block = await web3Service.getLatestBlock()
        setLatestBlock(block)
    }

    const getTransactionsDetails = async (transactionHashes: string[]) =>
        await web3Service.getTransactionsDetails(transactionHashes)

    return {
        latestBlock,
        fetch: fetchBlockchainData,
        subscribe: subscribeToBlockchain,
        unsubsribe: unsubscribeFromBlockchain,
        getTransactionsDetails
    }
}

export default useWeb3Api