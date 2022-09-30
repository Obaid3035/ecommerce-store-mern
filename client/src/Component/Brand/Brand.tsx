import React from 'react'
import './Brand.scss';
import { Container } from 'react-bootstrap';
import SliderLogo1 from "../../assets/img/slider-logo1.png";
import SliderLogo2 from "../../assets/img/slider-logo2.png";
import SliderLogo3 from "../../assets/img/slider-logo3.png";
import SliderLogo4 from "../../assets/img/slider-logo4.png";
import SliderLogo5 from "../../assets/img/slider-logo5.png";
import Slider from 'react-slick';

export const shopByBrand = [
    { id: 1, img: SliderLogo1 },
    { id: 2, img: SliderLogo2 },
    { id: 3, img: SliderLogo3 },
    { id: 4, img: SliderLogo4 },
    { id: 5, img: SliderLogo5 },
    { id: 6, img: SliderLogo1 },
    { id: 7, img: SliderLogo2 },
    { id: 8, img: SliderLogo3 },
    { id: 9, img: SliderLogo4 },
    { id: 10, img: SliderLogo5 },
    { id: 11, img: SliderLogo1 },
    { id: 12, img: SliderLogo2 }
]


const Brand = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className='shop_by_brand'>
            <Container>
                <div className='shop_brand'>
                    <h3> SHOP BY BRAND </h3>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>
                <Slider {...settings} >
                    {
                        shopByBrand.map((data) => {
                            const { id, img } = data
                            return (
                                <div key={id}>
                                    <img src={img} width={100} alt={'img'} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </Container>
        </div>
    )
}
export default Brand;
