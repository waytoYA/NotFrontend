import { useState,  useEffect } from 'react';
import { Page } from '@/components/Page';
import './StoreItemPage.css'

import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { ShareIcon } from '@/ui/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { add, incrementQuantity, decrementQuantity, BasketItem } from '@/store/slices/basketSlice';
import BuyButton from '@/components/blocks/BuyButton/BuyButton';
import { hapticFeedback, openTelegramLink, retrieveLaunchParams, viewportSafeAreaInsetTop } from '@telegram-apps/sdk-react';
import ImgWithLoading from '@/components/elements/imgWithLoading';

const StoreItemPage = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const safeItem = useSelector((state: {basket: {items: (BasketItem & {length: number})[]}}) => state.basket.items.find((i: any) => i.id == id));
    const dispatch = useDispatch();
    const { tgWebAppPlatform } = retrieveLaunchParams()

    const [item, setItem] = useState<BasketItem>({
        id: 0,
        name: '',
        category: '',
        description: '',
        price: 0,
        currency: '',
        left: 0,
        tags: {},
        images: [],
        quantity: 0,
    })
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!id) {
            navigate('/store')
            return;
        }
        api.store.items()
        .then(data => {
            const item = data.data.find((i: {id: number | string}) => i.id == id)
            if (!item) {
                window.location.href = '/store'
                return;
            }
            setSelectedImage(item.images[item.id - 1])
            setItem(item)
            setLoading(false)
        })
        .catch(() => {
            navigate('/store')
        })
    }, [])

    const changeSelectedImage = (value: string) => {
        setSelectedImage(value)
    }

    const addBasket = () => {
        dispatch(add(item))
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('medium')
    }

    const incrementQuantityItem = () => {
        dispatch(incrementQuantity(item))
    }

    const decrementQuantityItem = () => {
        dispatch(decrementQuantity(item))
    }

    const share = () => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        const url = `https://t.me/share/url?url=${import.meta.env.VITE_BOT_NAME}/app?startapp=item-${id}`
        openTelegramLink(url)
    }

    if (loading) return <Loading />

    return (
        <Page back={true}>
            <div className='storeItem'>

                <div className='header'>
                    <h1>{item.name}</h1>
                    <div onClick={share}>
                        <ShareIcon style={{ cursor: 'pointer' }}/>
                    </div>
                </div>

                <div className='storeItem_description'>
                    {item.description}
                </div>

                <div className='storeItem_tags'>
                    <div className='storeItem_tags_tag'>
                        <span>{item.price}</span> $NOT
                    </div>
                    <div className='storeItem_tags_tag'>
                        <span>{item.left}</span> LEFT
                    </div>
                    <div className='storeItem_tags_tag'>
                        <span>{item.tags["fabric"].split("%")[0]}%</span>
                        {item.tags["fabric"].split("%")[1]}
                    </div>
                </div>
                <ImgWithLoading
                    src={selectedImage}
                    className='storeItem_image'
                    style={{
                        height: `calc(100vh - ${tgWebAppPlatform != 'tdesktop' ? (viewportSafeAreaInsetTop() + 34 + 365) : 365}px)`,
                    }}
                />

                <div className='storeItem_panel'>
                    <div className='storeItem_panel_images'>
                        {
                            item.images.map((image: string) =>
                                <ImgWithLoading
                                    src={image}
                                    className={`storeItem_panel_images_image ${selectedImage == image ? 'storeItem_panel_images_image-selected' : ''}`}
                                    onClick={() => changeSelectedImage(image)}
                                />
                            )
                        }
                    </div>
                    <div className='storeItem_panel_buttons'>
                        {
                            safeItem
                            ?
                            <div
                                className='storeItem_panel_buttons_quantity'
                            >
                                <div onClick={decrementQuantityItem}>-</div>
                                <span>{safeItem.quantity}</span>
                                <div onClick={incrementQuantityItem}>+</div>
                            </div>
                            :
                            <button
                                className='button-secondary'
                                onClick={addBasket}
                            >
                                Add to cart
                            </button>
                        }
                        
                        <BuyButton>
                            Buy now
                        </BuyButton>
                    </div>
                </div>

            </div>
            
        </Page>
    )
}

export default StoreItemPage;