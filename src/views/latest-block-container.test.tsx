import { waitFor } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from 'setupTests'
import LatestBlockContainer from './latest-block-container'

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

describe('<LatestBlockContainer />', () => {
    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render, fetch and subscribe', async () => {
        //Arrange
        mockGetTransactionsDetails.mockReturnValue([])

        //Act
        renderWithProviders(<LatestBlockContainer />)

        //Assert
        expect.assertions(2)

        await waitFor(() => {
            expect(mockFetch).toBeCalledTimes(1)
        })

        expect(mockSubscribe).toBeCalledTimes(1)
    })
})