import useWeb3Api from 'hooks/useWeb3Api'
import React, { useEffect, useState } from 'react'
import LatestBlockView from './latest-block-view'

const LatestBlockContainer = () => {
    const [liveMode, setLiveMode] = useState<boolean>(true)

    const web3Api = useWeb3Api()

    useEffect(() => {
        const fetchLatestBlock = async () => {
            await web3Api.fetch()
            web3Api.subscribe()
        }
        fetchLatestBlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleLiveMode = () => {
        setLiveMode(prev => !prev)

        if (liveMode) {
            web3Api.unsubsribe()
        } else {
            web3Api.fetch()
            web3Api.subscribe()
        }
    }
    
    return (
        <LatestBlockView
            latestBlock={web3Api.latestBlock}
            toggleLiveMode={toggleLiveMode}
            liveMode={liveMode}
        />
    )
}

export default LatestBlockContainer