import { useState,  useEffect } from 'react';
import { Page } from '@/components/Page';
import './StorePage.css'

import { Link } from 'react-router-dom';
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { BasketIcon, SearchIcon, SuccessIcon } from '@/ui/Icons';
import TextFieldWithDebounce from '@/components/blocks/TextFieldWithDebounce/TextFieldWithDebounce';
import storeEmptyImage from '@/images/icons/storeEmpty.png'
import BasketPopup from '@/components/popups/BasketPopup';
import { useSelector } from 'react-redux';
import { BasketItem } from '@/store/slices/basketSlice';
import Empty from '@/components/renders/Empty/Empty';
import SwipeCarousel from '@/components/blocks/SwipeCarousel/SwipeCarousel';
import { hapticFeedback } from '@telegram-apps/sdk-react';

const StorePage = () => {

    const basket = useSelector((state: {basket: {items: (BasketItem & {length: number})[]}}) => state.basket.items);
    const [items, setItems] = useState<any>([])
    const [filteredItems, setFilteredItems] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [isBasket, setIsBasket] = useState<boolean>(false)

    useEffect(() => {
        api.store.items()
        .then(data => {
            setItems(data.data)
            setFilteredItems(data.data)
            setLoading(false)
        })
    }, [])

    const changeIsSearch = () => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        setIsSearch(prevState => !prevState)
        if (items.length != filteredItems.items) {
            setFilteredItems(items)
        }
    }

    const changeIsBasket = () => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        setIsBasket(prevState => !prevState)
    }

    const search = (value: string) => {
        if (value.length < 1) {
            setFilteredItems(items)
            return;
        }
        const newRows = items.filter((i: {name: string}) => i.name.includes(value))
        setFilteredItems(newRows)
    }

    const renderEmpty = () => {
        return <div className='store_empty'>
            <Empty 
                title="Not Found"
                subtitle="This style doesn’t exist"
                image={storeEmptyImage}
            />
        </div>
    }

    if (loading) return <Loading />

    return (
        <Page back={false}>
            
            <BasketPopup
                open={isBasket}
                onClose={changeIsBasket}
            />

            {
                isSearch
                ?
                <div className='search'>
                    <TextFieldWithDebounce
                        onChange={search}
                        delay={0} 
                    />
                    <span className='search_cancel' onClick={changeIsSearch}>Cancel</span>
                </div>
                :
                <div className='header'>
                    <h1>Not Store</h1>

                    <div className='flex'>
                        <div onClick={changeIsSearch}>
                            <SearchIcon style={{ cursor: 'pointer' }} />
                        </div>
                        <div onClick={changeIsBasket}>
                            {
                                basket.length < 1
                                ?
                                <BasketIcon style={{ marginLeft: '8px', cursor: 'pointer' }} />
                                :
                                <div className='store_basket_quantity'>
                                    <div>{basket.length}</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }

            {
                filteredItems.length < 1 && renderEmpty()
            }

            <div className='store_items'>
                {
                    filteredItems.map((item: any, index: number) =>
                        <Link
                            className='store_items_item'
                            to={`${item.id}`}
                        >

                            {
                                basket.find((i: {id: number}) => i.id == item.id) &&
                                <div className='store_items_item_inBasket'>
                                    <SuccessIcon style={{ fill: '#fff' }}/>
                                </div>
                            }

                            <div className='store_items_item_image'>
                                <SwipeCarousel images={item.images} startIndex={index} />
                                <div className='store_items_item_image_sliderCircles'></div>
                            </div>
        
                            <div className='store_items_item_name'>
                                {item.name}
                            </div>
        
                            <div className='store_items_item_price'>
                                <span className='store_items_item_price_number'>
                                    {item.price}
                                </span>
                                <span className='store_items_item_price_currency'>
                                    {item.currency}
                                </span>
                            </div>
                        </Link>
                    )
                }
            </div>
          
        </Page>
    )
}

export default StorePage;