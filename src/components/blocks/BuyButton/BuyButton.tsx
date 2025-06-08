import { useEffect, PropsWithChildren } from 'react';
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { hapticFeedback } from '@telegram-apps/sdk-react';

const BuyButton = ({
    children,
    style
}: PropsWithChildren<{
    style?: any;
}>) => {

    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const isConnectionRestored = useIsConnectionRestored()

    useEffect(() => {
        if (!wallet) {
            const TON_PAYLOAD = "Iamthebestdeveloper:)"
            tonConnectUI.setConnectRequestParameters({ state: 'loading' });
            
            const value = {tonProof: TON_PAYLOAD} // Отдали бы на подпись на бэк, если бы был бэк
            tonConnectUI.setConnectRequestParameters({state: 'ready', value});
        }
    }, [wallet, isConnectionRestored])

    const connect = async () => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('medium')
        if (wallet) {
            await tonConnectUI.disconnect()
        }
        await tonConnectUI.openModal()
    }

    return ( <button
            className='button-primary'
            onClick={connect}
            style={{ ...style }}
        >
            {children}
        </button>
    )
}

export default BuyButton;