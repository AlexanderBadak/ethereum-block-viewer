import { keyframes, Paper, styled, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import useWeb3Api from 'hooks/useWeb3Api'
import React, { useEffect, useState } from 'react'
import { transformerService } from 'services/transformer-service'
import { IMuiProps } from 'types/theme'
import { TTransactionGridRow } from 'types/transaction-grid'
import LoaderIcon from './loader-icon'

const GridTitle = styled(Typography)({
    fontSize: '2em'
})

const GridTitleCell = styled(TableCell)({
    border: 'none'
})

const Container = styled(Paper)({
    position: 'relative',
    padding: '0 3rem 1rem 3rem',
    marginBottom: '2rem',
    overflow: 'auto'
})

const StickyTableHead = styled(TableHead)((props: IMuiProps) => ({
    position: 'sticky',
    top: 0,
    borderCollapse: 'collapse',
    background: props.theme.colors.white
}))

const ColumnName = styled(TableCell)({
    fontWeight: 700
})

const StyledSvgIcon = styled(SvgIcon)((props: IMuiProps) => ({
    stroke: props.theme.colors.primary,
    height: '2rem',
    width: '2rem',
    animation: `${SpinAnimation} 3s infinite linear`
}))

const SpinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`

const LoadingIndicatorCell = styled(TableCell)({
    display: 'flex',
    alignItems: 'center',
    columnGap: '1rem'
})

type Props = {
    transactionHashes: string[]
}

const TransactionGrid = (props: Props) => {
    const { transactionHashes } = props

    const [transactions, setTransactions] = useState<TTransactionGridRow[]>([])

    const web3Api = useWeb3Api()

    useEffect(() => {
        const updateTransactionGrid = async () => {
            const transactionDetails = await web3Api.getTransactionsDetails(transactionHashes)
            const gridRows = transformerService.prepareTransactionDetailsToGridRows(transactionDetails)

            setTransactions(gridRows)
        }

        setTransactions([])
        updateTransactionGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionHashes])

    return (
        <Container>
            <Table>
                <StickyTableHead>
                    <TableRow>
                        <GridTitleCell colSpan={2}>
                            <GridTitle>
                                {'Block Transactions'}
                            </GridTitle>
                        </GridTitleCell>
                    </TableRow>
                    <TableRow>
                        <ColumnName width='60%'>
                            {'Transaction Hash'}
                        </ColumnName>
                        <ColumnName width='40%'>
                            {'Transaction Value (Wei)'}
                        </ColumnName>
                    </TableRow>
                </StickyTableHead>
                
                <TableBody>
                    {
                        transactions.length === 0 ?
                            <TableRow>
                                <LoadingIndicatorCell>
                                    <h2>{'Updating...'}</h2>
                                    <StyledSvgIcon>
                                        <LoaderIcon />
                                    </StyledSvgIcon>
                                </LoadingIndicatorCell>
                            </TableRow> :
                            transactions.map((row, index) => (
                                <TableRow key={`transaction-${index}`}>
                                    <TableCell>
                                        {row.transactionHash}
                                    </TableCell>
                                    <TableCell>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </Container>
    )
}

export default TransactionGrid