'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination} from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobilSlideshow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
            style={{
                width: '100vw',
                height: '500px'
            }}
                pagination={true}
                autoplay={{
                    delay:2500
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>

    )
}
