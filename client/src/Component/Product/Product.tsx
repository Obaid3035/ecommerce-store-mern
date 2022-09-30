import React, {useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import {FiHeart} from "react-icons/fi";
import {IProduct} from "../../Interfaces/site";
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "../../utils/helper";
import {createWishList} from "../../api/wishList";
import {errorNotify, successNotify} from "../../utils/toast";

interface IProductComponent {
    product: IProduct,
}

const Product: React.FC<IProductComponent> = ({product}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const onAddToWishListHandler = (productId: string) => {
        if (getCurrentUser()) {
            setIsLoading(true)
            createWishList(productId)
                .then((res) => {
                    successNotify(res.data.message)
                    setIsLoading(false)
                })
                .catch((err) => {
                    setIsLoading(false)
                    errorNotify(err.response.data.message);
                })
        } else {
            navigate("/login")
        }
    }

    if (isLoading) {
        return (
            <div className={"text-center"}>
                <Spinner animation={"border"}/>
            </div>
        )
    }


    return (
        <div className='cursor_pointer'>
            <Card className="cards_slider">
                <div className='addToCard_container'>
                    <div className={'wishlist'}>
                        <FiHeart onClick={() => onAddToWishListHandler(product._id)} className={"heart"}/>
                    </div>
                </div>
                <div onClick={() => navigate(`/shop-description/${product._id}`)}>
                    <Card.Img variant="top" className="card_img" src={product.images[0].avatar} height={300}/>
                    <Card.Body>
                        <Card.Title>
                            {`${product.name.slice(0, 30)}...`}
                        </Card.Title>

                        <Card.Text className={"d-flex justify-content-center"}>
                            {
                                ((product.price * product.discountPrice) / 100) <= 0 ? (
                                    <p className={"actual_price"}>$ {product.price}</p>
                                ) : (
                                    <React.Fragment>
                                        <p className={"discount_price"}>$ {product.price - ((product.price * product.discountPrice) / 100)}</p>
                                        <p className={"cross_price mx-2"}>$ {product.price}</p>
                                    </React.Fragment>
                                )
                            }
                        </Card.Text>
                        <button onClick={() => navigate(`/shop-description/${product._id}`)}>Shop Now</button>
                        <br/>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
};

export default Product;
