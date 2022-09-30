import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import CartInfo from './CartInfo/CartInfo'
import PaymentProceed from './PaymentProceed/PaymentProceed'
import Banner from "../../../Component/Banner/Banner";
import {
    getDecryptedCartItems,
    getDecryptedCustomerInfo,
    removeCart,
    removeUserInfo,
    storeEncryptedCartItems
} from "../../../utils/helper";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import {useNavigate} from "react-router-dom";
import {errorNotify} from "../../../utils/toast";
import {getHomePage} from "../../../api/cms";
import Offer from "../../../Component/Offer/Offer";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);

const Checkout = () => {
    const navigation = useNavigate();
    const [shippingAddress, setShippingAddress] = useState(null);
    const [cart, setCart] = useState([]);
    const [section7, setSection7] = useState(null)

    useEffect(() => {

        if (getDecryptedCartItems().length <= 0 || !getDecryptedCustomerInfo()) {
            removeCart();
            removeUserInfo();
            navigation("/")
            errorNotify("Cart is empty")
        } else {

            getHomePage()
                .then((res) => {
                    setSection7(res.data.section_7)
                })

            setCart(getDecryptedCartItems);
            setShippingAddress(getDecryptedCustomerInfo);
        }
    }, [])


    const onRemoveCartItemHandler = (id: string) => {
        const cartClone = cart.concat();
        const foundIndex = cartClone.findIndex((item: any) => item.inventory._id === id);
        cartClone.splice(foundIndex, 1)
        setCart(cartClone)
        storeEncryptedCartItems(cartClone)
        if (cartClone.length <= 0) {
            navigation("/")
            errorNotify("Cart is empty!")
            removeCart()
            removeUserInfo()
        }
    }




    return (
        <React.Fragment>
            <Banner heading={'SHOP'} cssClass={'shop_main'}/>
            <Container>
                {
                    cart.length > 0 && shippingAddress ? (
                        <Row className='mt-3'>
                            <Col md={8}>
                                <CartInfo
                                    onRemoveCartItemHandler={onRemoveCartItemHandler}
                                    cart={cart}/>
                                {
                                    section7 ? <Offer section7={section7}/> : null
                                }
                            </Col>

                            <Col md={4}>
                                <Elements stripe={stripePromise}>
                                    <PaymentProceed
                                        cart={cart}
                                        personalInfo={shippingAddress}/>
                                </Elements>
                            </Col>
                        </Row>
                    ) : null
                }


            </Container>

        </React.Fragment>
    )
}

export default Checkout
