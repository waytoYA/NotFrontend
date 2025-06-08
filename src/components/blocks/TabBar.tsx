import { useState, useEffect } from 'react';
import './TabBar.css'
import { useLocation, useNavigate } from 'react-router-dom';

import { AllRoutes } from '@/navigation/conts';
import { TabStoreIcon } from '@/ui/Icons';
import { useSelector } from 'react-redux';
import { Utils } from '@/helpers/Utils';
import BuyButton from './BuyButton/BuyButton';
import { hapticFeedback } from '@telegram-apps/sdk-react';

const TabBar = () => {

    const user = useSelector((state: any) => state.user.data);
    const basket = useSelector((state: any) => state.basket.items);
    const navigate = useNavigate()
    const location = useLocation();

    const [navigationValue, setNavigationValue] = useState<any>(location.pathname)

    useEffect(() =>{ 
        setNavigationValue(location.pathname)
    }, [location.pathname])

    const to = (url: string) => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        navigate(url)
    }

    if (!Object.values(AllRoutes).includes(navigationValue as any)) return <></>

    return (
        <div className='tabBar'>
            {
                basket.length < 1 ?
                <>
                    <div
                        onClick={() => to('/store')}
                        className={`tabBar_item ${navigationValue == '/store' ? 'tabBar_item-selected' : ''}`}
                    >
                        <TabStoreIcon />
                        <span>Store</span>
                    </div>
                    <div
                        onClick={() => to('/profile')}
                        className={`tabBar_item ${navigationValue == '/profile' ? 'tabBar_item-selected' : ''}`}
                    >
                        <img src={user.photo_url} style={{ }} />
                        <span>{user.first_name}</span>
                    </div>
                </>
                :
                <BuyButton style={{ marginTop: '6px' }}>
                    {`Buy for ${Utils.sumBasket(basket)} NOT`}
                </BuyButton>
            }
        </div>
    );
}

export default TabBar;
