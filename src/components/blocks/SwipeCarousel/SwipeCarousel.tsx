import { useRef, useState } from 'react';
import './SwipeCarousel.css';
import ImgWithLoading from '@/components/elements/imgWithLoading';

const SwipeCarousel = ({
    images,
    startIndex
}: {
    images: string[],
    startIndex: number
}) => {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const deltaX = useRef(0);

  const startSwipe = (x: any) => {
    startX.current = x;
    isDragging.current = true;
  };

  const moveSwipe = (x: any) => {
    if (!isDragging.current) return;
    deltaX.current = x - startX.current;
  };

  const endSwipe = () => {
    if (!isDragging.current) return;
    const threshold = 50;

    if (deltaX.current > threshold && index > 0) {
      setIndex(index - 1);
    } else if (deltaX.current < -threshold && index < images.length - 1) {
      setIndex(index + 1);
    }

    isDragging.current = false;
    deltaX.current = 0;
  };

  return (
    <div
      className="swipeCarousel"
      onTouchStart={(e) => {
        startSwipe(e.touches[0].clientX)
      }}
      onTouchMove={(e) => {
        moveSwipe(e.touches[0].clientX)
      }}
      onTouchEnd={endSwipe}
      onMouseDown={(e) => {
        e.preventDefault();
        startSwipe(e.clientX)
      }}
      onMouseMove={(e) => {
        e.preventDefault();
        moveSwipe(e.clientX);
      }}
      onMouseUp={endSwipe}
      onMouseLeave={endSwipe}
    >
      <div
        className="swipeTrack"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <ImgWithLoading key={'startIamge'} src={images[startIndex]} className="swipeImage" />
        
        {images.filter((_, index) => index != startIndex).map((src: any, i: any) => (
          <img key={i} src={src} className="swipeImage" />
        ))}
      </div>
    </div>
  );
}

export default SwipeCarousel;