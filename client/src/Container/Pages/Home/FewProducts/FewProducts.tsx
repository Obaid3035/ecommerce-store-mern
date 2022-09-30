import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap'
import Slider from 'react-slick';
import ProductColors from "./ProductColors/ProductColors";
import {IProduct} from "../../../../Interfaces/site";
import './FewProducts.scss';
import Product from "../../../../Component/Product/Product";
import {getFewProduct} from "../../../../api/product";
import Loader from "../../../../Component/Loader/Loader";

export interface IColor {
    _id: string,
    name: string,
    code: string
}

const FewProducts: React.FC<{colors: IColor[]}> = ({ colors }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [colorId, setColorId] = useState<string | null>(null)
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setIsLoading(true)
        getFewProduct(colorId!)
            .then((res) => {
                setIsLoading(false)
                setProducts(res.data)
            })
    }, [colorId])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <React.Fragment>
            <ProductColors colorId={colorId!} colors={colors} setColorId={setColorId} />
            <Container>

                {
                    !isLoading ? (
                        products.length > 0 ?
                            (
                                <Slider {...settings} >
                                    {
                                        products.map((product) => {
                                            return <Product key={product._id} product={product}/>
                                        })
                                    }
                                </Slider>
                            ) : (
                                <div className={"text-center"}>
                                    <p>No Product Found</p>
                                </div>
                            )
                        ) : <Loader cms={true}/>

                }

            </Container>
        </React.Fragment>
    )
}
export default FewProducts
