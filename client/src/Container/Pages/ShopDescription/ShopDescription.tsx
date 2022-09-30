import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Spinner} from 'react-bootstrap'
import ProductImage from './ProductImage/ProductImage'
import ProductForm from './ProductForm/ProductForm'
import { AiOutlineHome } from 'react-icons/ai'
import Banner from "../../../Component/Banner/Banner";
import {getProductById} from "../../../api/product";
import {useParams} from "react-router-dom";


const ShopDescription = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        setIsLoading(true)
        getProductById(id!)
            .then((res) => {
                setIsLoading(false);
                setProduct(res.data);
            })
    }, [])


    let data;


    if (isLoading) {
        data = (
            <div className="text-center">
                <Spinner animation={"border"}/>
            </div>
        )
    }

    if (!isLoading && product) {
        data = (
            <Container>
                <span className='home'><AiOutlineHome className='home_icon' /> / <span onClick={() => window.location.href = `/shop?parentCategory=${product.parentCategory._id}`}>
                    {product.parentCategory.name}'s</span>
                    / {product.name}</span>

                <Row>
                    <Col md={6}>
                        <ProductImage images={product.images} />
                    </Col>

                    <Col md={6}>
                        <ProductForm product={product} />
                    </Col>
                </Row>

            </Container>
        )
    }

    return (
        <React.Fragment>
            <Banner heading={'SHOP'} cssClass={'shop_main'} />
            { data }
        </React.Fragment>
    )
}

export default ShopDescription
