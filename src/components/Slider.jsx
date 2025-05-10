import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode } from 'swiper/modules';

const Slider = ({
  direction = 'vertical',
  slidesPerView = 6,
  speed = 2000,
  className = '',
  data = [],
  slideClassName = '',
  renderSlide
}) => {
  return <Swiper
    direction={direction}
    slidesPerView={slidesPerView}
    loop={true}
    freeMode={true}
    allowTouchMove={false}
    speed={speed}
    autoplay={{
      delay: 0,
      disableOnInteraction: false,
    }}
    className={className}
    modules={[Autoplay, FreeMode]}
  >
    {
      data.map((item, index) => {
        return <SwiperSlide key={index} className={slideClassName}>
          {renderSlide(item, index)}
        </SwiperSlide>
      })
    }
  </Swiper>
}

export default Slider