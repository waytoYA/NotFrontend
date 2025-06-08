import { Utils } from '@/helpers/Utils';
import './Row.css'
import { BasketItemAll } from '@/pages/ProfilePage/ProfilePage';
import ImgWithLoading from '@/components/elements/imgWithLoading';

interface Row  {
    item: BasketItemAll;
    index: number
}

const RowHistory = ({
    item,
    index,
}: Row) => {

    return <div className='row_items_item'>
        <div className='flex-center'>
            <ImgWithLoading src={item.images[index]} />
            <div className='flex-column'>
                <span>{item.category}</span>
                <h4>{item.name}</h4>
            </div>
        </div>
        <div className='flex-center'>
            <div className='flex-column-right'>
                <span>{Utils.toFormatDate(item.timestamp)}</span>
                <h4>{item.total} {item.currency}</h4>
            </div>
        </div>
    </div>
}

export default RowHistory;
