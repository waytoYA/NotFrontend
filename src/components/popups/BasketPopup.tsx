import './BasketPopup.css'
import Modal from '../renders/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { remove, BasketItem } from '@/store/slices/basketSlice';
import Row from '../renders/Row/Row';
import Empty from '../renders/Empty/Empty';
import BuyButton from '../blocks/BuyButton/BuyButton';
import { Utils } from '@/helpers/Utils';
import { hapticFeedback } from '@telegram-apps/sdk-react';

 
const BasketPopup = ({
    open,
    onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const basket = useSelector((state: {basket: {items: (BasketItem & {length: number})[]}}) => state.basket.items);
    const dispatch = useDispatch();

    const removeBasketItem = (id: number) => {
        if (hapticFeedback.isSupported()) hapticFeedback.impactOccurred('light')
        dispatch(remove({id}))
    }

    return (
        <Modal open={open} onClose={onClose}>
            {
                basket.length < 1 ?
                <div className='basket_empty'>
                    <Empty 
                        title="Cart's cold"
                        subtitle="No items yet"
                    />
                </div>
                :
                <div className='basket_title'>
                    Cart
                </div>
            }

            <div className='basket_items'>
                {
                    basket.map((item: BasketItem, index: number) =>
                        <Row
                            item={item}
                            index={index}
                            removeBasketItem={removeBasketItem}
                        />
                    )
                }
            </div>

            {
                basket.length > 0
                ?
                <BuyButton>
                    {`Buy for ${Utils.sumBasket(basket)} NOT`}
                </BuyButton>
                :
                <button className='basket_button button-primary' onClick={onClose}>
                    OK
                </button>
            }
        </Modal>
    )
}

export default BasketPopup;