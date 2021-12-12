import React from 'react'
import { TTransactionGridRow } from 'types/transaction-grid'
import { Transaction } from 'web3-eth'
import { transformerService } from './transformer-service'

describe('TransformerService', () => {
    const fakeTransaction1: Transaction = {
        hash: 'fakeHash1',
        value: '123',
        blockHash: '',
        blockNumber: 1,
        from: '',
        gas: 0,
        gasPrice: '',
        input: '',
        nonce: 0,
        to: '',
        transactionIndex: 0
    }

    const fakeTransaction2: Transaction = {
        ...fakeTransaction1,
        hash: 'fakeHash2',
        value: '456'
    }

    const fakeTransaction3: Transaction = {
        ...fakeTransaction1,
        hash: 'fakeHash3',
        value: ''
    }

    const props: {transactions: Transaction[]} = {
        transactions: [fakeTransaction1, fakeTransaction2, fakeTransaction3]
    }

    it('should transform and sort data', () => {
        //Arrange
        const expectedTransactions: TTransactionGridRow[] = [
            {
                transactionHash: fakeTransaction2.hash,
                value: 456,
                valueText: fakeTransaction2.value
            },
            {
                transactionHash: fakeTransaction1.hash,
                value: 123,
                valueText: fakeTransaction1.value
            },
            {
                transactionHash: fakeTransaction3.hash,
                value: -1,
                valueText: '-'
            }]

        //Act
        const preparedTransactionDetails = transformerService.prepareTransactionDetailsToGridRows(props.transactions)

        //Assert
        expect(preparedTransactionDetails).toEqual(expectedTransactions)
    })
})