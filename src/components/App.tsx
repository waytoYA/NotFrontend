import AppRoutes from '@/navigation/routes';
import { init, miniApp, expandViewport, viewport, requestFullscreen, parseInitDataQuery, retrieveRawInitData, retrieveLaunchParams, swipeBehavior, disableVerticalSwipes, viewportSafeAreaInsetTop } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import TabBar from '@/components/blocks/TabBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set } from '@/store/slices/userSlice';
import Loading from './elements/Loading';
import { useIsConnectionRestored, useTonWallet } from '@tonconnect/ui-react';
import PurchaseSuccessModal from './blocks/PurchaseSuccessModal/PurchaseSuccessModal';

export function App() {

    const dispatch = useDispatch();
    const wallet = useTonWallet();
    const navigate = useNavigate();
    const isConnectionRestored = useIsConnectionRestored()
    const initDataRaw = retrieveRawInitData()
    const { tgWebAppPlatform } = retrieveLaunchParams()

    const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        telegramSdkInit()
        init()
        changeTheme()
        setLoading(false)
    }, [])

    useEffect(() => {
        if (wallet?.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            setPurchaseSuccess(true)
        }
    }, [wallet, isConnectionRestored])

    const telegramSdkInit = () => {
        if (!initDataRaw) return;
        const initData = parseInitDataQuery(initDataRaw)
        dispatch(set(initData.user))
        const params = initData.start_param
        if (params?.split('-')[0] == 'item') {
            const idItem = params?.split('-')[1]
            navigate(`/store/${idItem}`)
        }

        if (swipeBehavior.isSupported()) {
            swipeBehavior.mount()
            disableVerticalSwipes()
        }
        if (tgWebAppPlatform != 'tdesktop') {
            if (viewport.requestFullscreen.isAvailable()) {
                requestFullscreen()
            }
        }
        miniApp.ready()
        expandViewport()
    }

    const changeTheme = () => {
        const theme = localStorage.getItem('theme')
        if (theme == 'dark') {
            document.querySelector('body')?.setAttribute('data-theme', 'dark')
        }
        if (miniApp.setHeaderColor.isSupported()) {
            if (theme == 'dark') {
                miniApp.setHeaderColor('#000000');
                miniApp.setBottomBarColor('#000000')
            } else {
                miniApp.setHeaderColor('#ffffff');
                miniApp.setBottomBarColor('#ffffff')
            }
        }
    }

    const closePurchasesSuccessModal = () => {
        setPurchaseSuccess(false)
    }

    if (loading) return <Loading />

    return (
        <div className='container' style={{
            height: `100vh`,
            paddingTop: tgWebAppPlatform != 'tdesktop' ? `${viewportSafeAreaInsetTop() + 34}px` : '16px',

        }}>
            {
                purchaseSuccess && 
                <PurchaseSuccessModal onClose={closePurchasesSuccessModal} />
            }
            <AppRoutes />
            <TabBar />
        </div>  
    );
}
