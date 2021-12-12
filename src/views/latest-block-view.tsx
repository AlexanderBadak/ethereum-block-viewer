import { Paper, Button, styled, Typography, SvgIcon } from '@mui/material'
import BlockIcon from 'components/block-icon'
import PauseIcon from 'components/pause-icon'
import RadioIcon from 'components/radio-icon'
import TransactionGrid from 'components/transaction-grid'
import React from 'react'
import { IMuiProps } from 'types/theme'
import { BlockTransactionString } from 'web3-eth'

const ViewContainer = styled(Paper)((props: IMuiProps) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '3rem',
    margin: 'auto',
    width: '60%',
    background: props.theme.colors.background,
    padding: '0 5rem',
    boxSizing: 'content-box'
}))

const TopContainer = styled('div')({
    display: 'flex',
    columnGap: '10rem',
    rowGap: '3rem',
    flexWrap: 'wrap',
    marginTop: '5rem'
})

const TitleContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Title = styled(Typography)((props: IMuiProps) => ({
    fontSize: '4em',
    fontWeight: 700,
    color: props.theme.colors.white,
}))

const ColoredTitle = styled(Title)((props: IMuiProps) => ({
    color: props.theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    columnGap: '1rem'
}))

const BlockTitle = styled(Typography)({
    fontSize: '2em',
    marginBottom: '1rem'
})

const LatestBlockContainer = styled(Paper)({
    padding: '1rem 3rem'
})

const LatestBlockText = styled(Typography)({
    lineHeight: '2'
})

const LiveModeButton = styled(Button)((props: IMuiProps) => ({
    display: 'flex',
    columnGap: '1rem',
    padding: '.75rem 0',
    color: 'white',
    fontSize: '1.15em',
    width: '15rem',
    textTransform: 'none',
    backgroundColor: props.theme.colors.primaryBright,
    '&:hover': {
        backgroundColor: props.theme.colors.primary,
    }
}))

const StyledBlockIcon = styled(SvgIcon)((props: IMuiProps) => ({
    height: '4rem',
    width: '4rem',
    fill: 'none',
    stroke: props.theme.colors.primary
}))

export type Props = {
    latestBlock?: BlockTransactionString
    toggleLiveMode: () => void
    liveMode: boolean
}

const LatestBlockView = (props: Props) => {
    const { latestBlock, liveMode, toggleLiveMode } = props
    
    return (
        <ViewContainer>
            <TopContainer>
                <TitleContainer>
                    <Title variant='h1'>{'Ethereum '}</Title>
                    <ColoredTitle variant='h1'>
                        {'Block '}
                        <StyledBlockIcon>
                            <BlockIcon />
                        </StyledBlockIcon>
                    </ColoredTitle>
                    <Title variant='h1'>{'Viewer'}</Title>
                </TitleContainer>

                <LatestBlockContainer>
                    <BlockTitle variant='h2'>
                        {'Latest Block'}
                    </BlockTitle>
                    <LatestBlockText>{`Block number: ${latestBlock?.number ?? ''}`}</LatestBlockText>
                    <LatestBlockText>{`Number of transactions: ${latestBlock?.transactions.length ?? ''}`}</LatestBlockText>
                    <LatestBlockText>{`Miner address: ${latestBlock?.miner ?? ''}`}</LatestBlockText>
                    <LatestBlockText>{`Total difficulty: ${latestBlock?.totalDifficulty ?? ''}`}</LatestBlockText>
                </LatestBlockContainer>
            </TopContainer>

            <LiveModeButton onClick={toggleLiveMode}>
                {liveMode ? 'Pause' : 'Live Mode'}
                <SvgIcon>
                    {
                        liveMode ? <PauseIcon /> : <RadioIcon />
                    }
                </SvgIcon>
            </LiveModeButton>

            <TransactionGrid transactionHashes={latestBlock?.transactions ?? []} />
        </ViewContainer>
    )
}

export default LatestBlockView