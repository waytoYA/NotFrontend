import { useState,  useEffect } from 'react';
import { Page } from '@/components/Page';
import './ProfilePage.css'
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { useSelector } from 'react-redux';
import { BasketItem } from '@/store/slices/basketSlice';
import RowHistory from '@/components/renders/Row/RowHistory';
import Empty from '@/components/renders/Empty/Empty';
import Switch from '@/components/blocks/Switch/Switch';
import { hapticFeedback, miniApp } from '@telegram-apps/sdk-react';
import { UserData } from '@/store/slices/userSlice';

export interface BasketItemHistory {
    id: number;
    timestamp: number;
    total: number;
    currency: string;
}

export type BasketItemAll = BasketItem & BasketItemHistory

const ProfilePage = () => {

    const user = useSelector((state: {user: {data: UserData}}) => state.user.data);
    const [history, setHistory] = useState<BasketItemAll[]>([])
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.store.items()
        .then(storeItems => {
            api.profile.history()
            .then((historyItems) => {
                historyItems = historyItems.data.map((i: BasketItemHistory) => {
                    return {
                        ...i,
                        ...storeItems.data.find((j: BasketItem) => j.id == i.id)
                    }
                })
                setHistory(historyItems)
                setLoading(false)
            })
        })
    }, [])

    const changeTheme = (value: string) => {
        if (value == theme) return;
        setTheme(value)
        localStorage.setItem('theme', value)

        document.querySelector('body')?.setAttribute('data-theme', value)

        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        if (miniApp.setHeaderColor.isSupported()) {
            if (value == 'dark') {
                miniApp.setHeaderColor('#000000');
                miniApp.setBottomBarColor('#000000')
            } else {
                miniApp.setHeaderColor('#ffffff');
                miniApp.setBottomBarColor('#ffffff')
            }
        }
    }

    if (loading) return <Loading />

    return (
        <Page back={false}>

            <div className='profile_header'>
                <img src={user.photo_url} />
                <span>{user.first_name}</span>
                    
                <div className='profile_settings'>
                    <Switch
                        value={theme}
                        onChange={changeTheme}
                    />
                </div>
            </div>

            {
                history.length < 1
                ?
                <div className='profile_empty'>
                    <Empty 
                        title="No history yet"
                        subtitle="Let’s change that"
                    />
                </div>
                :
                <div className='profile_history'>
                    <div className='profile_history_title'>
                        History
                    </div>
                    <div className='profile_history_items'>
                        {
                            history.map((historyItem: BasketItemAll) =>
                                <RowHistory
                                    item={historyItem}
                                    index={historyItem.id - 1}
                                />
                            )
                        }
                    </div>
                </div>
            }

        </Page>
    )
}

export default ProfilePage;