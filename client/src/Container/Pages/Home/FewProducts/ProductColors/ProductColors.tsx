import React from 'react';
import {Container} from 'react-bootstrap';
import "./ProductColors.scss";
import {IColor} from "../FewProducts";
import Slider from 'react-slick';

interface IProductColors {
    colors: IColor[],
    setColorId: React.Dispatch<React.SetStateAction<string | null>>,
    colorId: string
}

const ProductColors: React.FC<IProductColors> = ({colors, setColorId, colorId}) => {

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
                    dots: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    let showColors = (
        <div className='inner_container'>
            {
                colors.map((color, index) => (
                    <div className='colors_section' key={index}>
                        <div onClick={() => setColorId(color._id)} style={{
                            backgroundColor: color.code,
                        }}/>
                        <p className='mt-3'>{color.name}</p>
                    </div>
                ))
            }
        </div>
    )

    if (colors.length >= 6) {
        showColors = (
            <div className='inner_slick_container'>
                <Slider {...settings}>
                    {
                        colors.map((color, index) => (
                            <div className='colors_section' key={index}>
                                <div onClick={() => setColorId(color._id)} style={{
                                    backgroundColor: color.code,
                                    border: color._id === colorId ? "3px solid #047E3E" : ""
                                }}/>
                                <p className='mt-3 text-center'>{color.name}</p>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        )
    }

    return (
        <Container className="shop_container">
            <h3> SHOP BY COLOR </h3>
            {showColors}
        </Container>
    );
};
export default ProductColors;
