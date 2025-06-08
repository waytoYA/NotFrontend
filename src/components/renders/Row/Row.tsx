import './Row.css'
import { RemoveIcon } from '@/ui/Icons';
import { BasketItem } from '@/store/slices/basketSlice';
import ImgWithLoading from '@/components/elements/imgWithLoading';

interface Row  {
    item: BasketItem;
    removeBasketItem: (id: number) => void;
    index: number
}

const Row = ({
    item,
    removeBasketItem,
    index,
}: Row) => {
    return <div className='row_items_item'>
            <div className='flex-center'>
                <ImgWithLoading src={item.images[index]} />
                <div className='flex-column'>
                    <span>{item.category}</span>
                    <h4>{item.name} (x{item.quantity})</h4>
                </div>
            </div>
            <div className='flex-center'>
                <div className='row_items_item_price'>
                    {item.price} {item.currency}
                </div>
                <div
                    className='row_items_item_remove'
                    onClick={() => removeBasketItem(item.id)}
                >
                    <RemoveIcon />
                </div>
            </div>
        </div>
}

export default Row;
