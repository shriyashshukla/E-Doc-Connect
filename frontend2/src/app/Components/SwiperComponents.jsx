import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperComponent = ({ darkMode }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className={`mySwiper ${darkMode ? 'dark-mode' : ''}`}
    >
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x400" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x400" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x400" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
