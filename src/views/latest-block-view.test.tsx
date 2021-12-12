import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { renderWithProviders } from 'setupTests'
import LatestBlockView from './latest-block-view'
import { Props as LatestBlockViewProps } from './latest-block-view'

describe('<LatestBlockView />', () => {
    const defaultProps: LatestBlockViewProps = {
        liveMode: false,
        toggleLiveMode: jest.fn(),
        latestBlock: {
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
    }

    let props = {...defaultProps}

    beforeEach(() => {
        props = {...defaultProps}
    })

    it('should render without optional props and live mode', async () => {
        //Arrange
        props.latestBlock = undefined
        props.liveMode = true

        //Act
        await act(async () => {
            renderWithProviders(<LatestBlockView {...props} />)
        })
        
        const liveModeButtonElement = screen.getByRole('button', { name: 'Pause'})

        //Assert
        expect(liveModeButtonElement).toBeVisible()
        expect(liveModeButtonElement).toBeEnabled()
    })

    it('should render with optional props and display block data', async () => {
        //Arrange

        //Act
        await act(async () => {
            renderWithProviders(<LatestBlockView {...props} />)
        })
        
        const liveModeButtonElement = screen.getByRole('button', { name: 'Live Mode'})
        const blockNumberElement = screen.getByText(`Block number: ${props.latestBlock!.number}`)
        const transactionCount = screen.getByText(`Number of transactions: ${props.latestBlock!.transactions.length}`)
        const minerAddress = screen.getByText(`Miner address: ${props.latestBlock!.miner}`)
        const totalDifficulty = screen.getByText(`Total difficulty: ${props.latestBlock?.totalDifficulty}`)
  
        //Assert
        expect(liveModeButtonElement).toBeVisible()
        expect(liveModeButtonElement).toBeEnabled()

        expect(blockNumberElement).toBeVisible()
        expect(transactionCount).toBeVisible()
        expect(minerAddress).toBeVisible()
        expect(totalDifficulty).toBeVisible()
    })

    it('should fire toggle event', async () => {
        //Arrange

        //Act
        await act(async () => {
            renderWithProviders(<LatestBlockView {...props} />)
        })
        
        const liveModeButtonElement = screen.getByRole('button', { name: 'Live Mode'})
        userEvent.click(liveModeButtonElement)

        //Assert
        expect(props.toggleLiveMode).toBeCalledTimes(1)
    })
})