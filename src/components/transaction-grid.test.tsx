import { act, screen } from '@testing-library/react'
import React from 'react'
import TransactionGrid from './transaction-grid'
import { Transaction } from 'web3-eth'
import { renderWithProviders } from 'setupTests'

const mockFetch = jest.fn()
const mockSubscribe = jest.fn()
const mockUnsubscribe = jest.fn()
const mockGetTransactionsDetails = jest.fn()

jest.mock('hooks/useWeb3Api', () => () => ({
    fetch: mockFetch,
    subscribe: mockSubscribe,
    unsubsribe: mockUnsubscribe,
    getTransactionsDetails: mockGetTransactionsDetails
}))

describe('<TransactionGrid />', () => {
    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render without data', async () => {
        //Arrange
        mockGetTransactionsDetails.mockReturnValue([])

        //Act
        await act(async () => {
            renderWithProviders(<TransactionGrid transactionHashes={[]} />)
        })

        const suspenseMessageElement = screen.getByText('Updating...')

        //Assert
        expect(suspenseMessageElement).toBeVisible()

        expect(mockGetTransactionsDetails).toBeCalledTimes(1)
        expect(mockGetTransactionsDetails).toBeCalledWith([])
    })

    it('should render with data', async () => {
        //Arrange
        const props = {
            transactionHashes: ['fakeHash1', 'fakeHash2']
        }

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
            value: '789'
        }
    
        const fakeTransactionDetails: Transaction[] = [
            fakeTransaction1,
            fakeTransaction2,
            fakeTransaction3
        ]

        mockGetTransactionsDetails.mockReturnValue(fakeTransactionDetails)
                
        //Act
        await act(async () => {
            renderWithProviders(<TransactionGrid {...props} />)
        })

        //Assert
        expect.assertions(fakeTransactionDetails.length * 2)

        for (const transaction of fakeTransactionDetails) {
            expect(screen.getByText(transaction.hash)).toBeVisible()
            expect(screen.getByText(transaction.value)).toBeVisible()
        }
    })
})