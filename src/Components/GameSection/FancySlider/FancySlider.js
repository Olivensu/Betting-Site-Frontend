import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1  from '../../../img/Blue Minimalist Shopping Sale YouTube Thumbnail.png'
import img2  from '../../../img/GIVEAWAY (Facebook Cover) (1).png'
import img3  from '../../../img/GIVEAWAY (Facebook Cover).png'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const FancySlider = () => {
    
    return (
        <div className="w-full p-5 bg-[#6C005E]">
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full rounded-3xl shadow-2xl"
      >
        <SwiperSlide><img className='w-full' src={img1} alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img  className='w-full' src={img2} alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img  className='w-full' src={img3} alt="Slide 2" /></SwiperSlide>
      </Swiper>
    </div>
    );
};

export default FancySlider;