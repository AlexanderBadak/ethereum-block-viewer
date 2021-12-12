import ValidationHelper from 'helper/validation-helper'
import { TTransactionGridRow } from 'types/transaction-grid'
import { Transaction } from 'web3-eth'

export interface ITransformerService {
    prepareTransactionDetailsToGridRows: (transactionDetails: Transaction[]) => void
}

class TransformerService implements ITransformerService {
    public prepareTransactionDetailsToGridRows = (transactionDetails: Transaction[]) => {
        const mappedTransactionDetails = transactionDetails.map<TTransactionGridRow>(td => {
            const value = ValidationHelper.tryParseInt(td.value, -1)
            const valueText = value >= 0 ? value.toString() : '-'

            return {
                transactionHash: td.hash,
                value,
                valueText
            }
        })

        mappedTransactionDetails.sort((a, b) => b.value - a.value)

        return mappedTransactionDetails
    }
}

export const transformerService = new TransformerService()