import { useState, useEffect } from "react";
import stockImage from '@/images/image-stock.png'

const ImgWithLoading = ({ src, ...props }: any) => {

    const [imgSrc, setImgSrc] = useState(stockImage || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    return (
        <img
            { ...{ src: imgSrc, ...props } }
        />
    );
};
export default ImgWithLoading;