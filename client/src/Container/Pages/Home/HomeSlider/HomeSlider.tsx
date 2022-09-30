import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
import "./HomeSlider.scss";
import {IHomeSlider} from "../../../../Interfaces/site";

const HomeSlider: React.FC<IHomeSlider> = ({ slider }) => {

    const navigation = useNavigate()

    const SampleNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", fontSize: "40px", color: "black" }}
                onClick={onClick}>
                <MdArrowForwardIos className='Forward_Arrow_icons' />
            </div>
        );
    }

    const SamplePrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", fontSize: "40px", color: "black", marginLeft: "-15px" }}
                onClick={onClick}>
                <MdArrowBackIos  className='Previous_Arrow_icons' />
            </div>
        );
    }

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            },
        ]
    };


    return (
        <div className='main_container'>
            <Container>
                <Slider {...settings} className='background_slider'>
                    <div className="caption_container">
                        <div dangerouslySetInnerHTML={{ __html: slider.slider_1.text }} />
                        <button onClick={() => navigation("/shop")}>Shop Now</button>
                    </div>

                    <div className='sliding_img_container'>
                        <img src={slider.slider_1.image.avatar} alt={'img'} />
                    </div>

                    <div className="caption_container">
                        <div dangerouslySetInnerHTML={{ __html: slider.slider_2.text }} />
                        <button onClick={() => navigation("/shop")}>Shop Now</button>
                    </div>

                    <div className='sliding_img_container'>
                        <img src={slider.slider_2.image.avatar} alt={'img'} />
                    </div>

                    <div className="caption_container">
                        <div dangerouslySetInnerHTML={{ __html: slider.slider_3.text }} />
                        <button onClick={() => navigation("/shop")}>Shop Now</button>
                    </div>

                    <div className='sliding_img_container'>
                        <img src={slider.slider_3.image.avatar} alt={'img'} />
                    </div>
                </Slider>
            </Container>
        </div>

    );
};
export default HomeSlider;
