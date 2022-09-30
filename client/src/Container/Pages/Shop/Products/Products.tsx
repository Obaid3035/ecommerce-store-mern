import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Products.scss';
import Pagination from '../../../../Component/Pagination/Pagination';
import {PAGINATION_LIMIT} from "../../../../utils/helper";
import {IProduct} from "../../../../Interfaces/site";
import Product from "../../../../Component/Product/Product";

interface IProductsComponent {
    products: IProduct[],
    page: number,
    setPage: any,
    productCount: number
}


const Products: React.FC<IProductsComponent> = ({ products, page, setPage, productCount }) => {

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='picture_container'>
                            { products.length > 0 ? (
                                products.map((product) => {
                                    return (
                                        <Product product={product}  />
                                    )
                                })
                            ) : (
                                <div className="text-center">
                                    <p>No Product Found</p>
                                </div>
                            )}
                        </div>
                        <Pagination page={page} totalPage={Math.ceil(productCount / PAGINATION_LIMIT)} setPage={setPage}/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Products

