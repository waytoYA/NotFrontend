import './PurchaseSuccessModal.css'
import purchaseSuccessGif from '@/images/gifs/purchaseSuccess.gif'

const PurchaseSuccessModal = ({
    onClose
}: any) => {

    return ( <div className='purchaseSuccess'>
        <img src={purchaseSuccessGif} className='purchaseSuccess_gif' />
        <div className='purchaseSuccess_title'>
            You Got It!
        </div>
        <div className='purchaseSuccess_subtitle'>
            Your purchase is on the way
        </div>
        <button className='purchaseSuccess_button button-primary' onClick={onClose}>
            Awesome
        </button>
    </div>
    )
}

export default PurchaseSuccessModal;