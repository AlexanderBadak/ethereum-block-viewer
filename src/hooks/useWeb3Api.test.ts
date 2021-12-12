import { waitFor } from '@testing-library/react'
import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import useWeb3Api from './useWeb3Api'
import { BlockTransactionString } from 'web3-eth'
import { web3Service } from 'services/web3-service'

describe('useWeb3Api', () => {
    const fakeBlockResult: BlockTransactionString = {
        hash: 'fakeHash',
        totalDifficulty: 12345,
        miner: 'fakeMiner',
        transactions: [
            'fakeTransaction1',
            'fakeTransaction2'
        ],
        difficulty: 0,
        extraData: '',
        gasLimit: 0,
        gasUsed: 0,
        logsBloom: '',
        nonce: '',
        number: 0,
        parentHash: '',
        receiptsRoot: '',
        sha3Uncles: '',
        size: 0,
        stateRoot: '',
        timestamp: '',
        transactionRoot: '',
        uncles: []
    }

    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    beforeEach(() => {
        web3Service.getLatestBlock = jest.fn().mockReturnValue(fakeBlockResult)
        web3Service.subscribeToBlockchain = jest.fn()
        web3Service.getBlockByBlockNumber = jest.fn()
        web3Service.getTransactionsDetails = jest.fn()
        web3Service.unsubscribeFromBlockchain = jest.fn()
    })

    it('should call web3Service fetch and set latest block', async () => {
        //Arrange

        //Act
        const { result } = renderHook(() => useWeb3Api())

        act(() => {
            result.current.fetch()
        })

        //Assert
        expect.assertions(3)

        await waitFor(() => {
            expect(result.current.latestBlock).toEqual(fakeBlockResult)
            expect(web3Service.getLatestBlock).toBeCalledTimes(1)
        })
    })

    it('should call web3Service subscribe', () => {
        //Arrange

        //Act
        const { result } = renderHook(() => useWeb3Api())

        act(() => {
            result.current.subscribe()
        })

        //Assert
        expect(web3Service.subscribeToBlockchain).toBeCalledWith(expect.any(Function))
        expect(web3Service.subscribeToBlockchain).toBeCalledTimes(1)
    })

    it('should call web3Service unsubscribe', () => {
        //Arrange

        //Act
        const { result } = renderHook(() => useWeb3Api())

        act(() => {
            result.current.unsubsribe()
        })

        //Assert
        expect(web3Service.unsubscribeFromBlockchain).toBeCalledTimes(1)
    })

    it('should call web3Service getTransactionsDetails', async () => {
        //Arrange
        const fakeTransactionHashes = ['fakeHash1', 'fakeHash2', 'fakeHash3']
        
        //Act
        const { result } = renderHook(() => useWeb3Api())

        act(() => {
            result.current.getTransactionsDetails(fakeTransactionHashes)
        })

        //assert
        expect.assertions(2)

        await waitFor(() => {
            expect(web3Service.getTransactionsDetails).toBeCalledWith(fakeTransactionHashes)
            expect(web3Service.getTransactionsDetails).toBeCalledTimes(1)
        })
    })
})