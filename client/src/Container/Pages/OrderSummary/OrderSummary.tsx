import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Table} from 'react-bootstrap';
import Banner from "../../../Component/Banner/Banner";
import {useNavigate} from 'react-router-dom'
import {getDecryptedCartItems, removeCart, removeUserInfo, storeEncryptedCartItems} from "../../../utils/helper";
import {errorNotify} from "../../../utils/toast";
import CartItem from "../../../Component/CartItem/CartItem";
import './OrderSummary.scss';

const OrderSummary = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useState<any>([]);
    const plus = (id: string, qty: number) => {
        const cartClone = cart.concat();
        const foundIndex = cartClone.findIndex((item: any) => item.inventory._id === id);
        if (cartClone[foundIndex].inventory.quantity <= qty) {
            errorNotify(`Only ${cartClone[foundIndex].inventory.quantity} Items Left`)
        } else {
            cartClone[foundIndex].qty += 1
            setCart(cartClone)
            storeEncryptedCartItems(cartClone)
        }
    }

    const getTotalPrice = () => {
        const totalPrice = cart.reduce((curVal: any, acc: any) => {
            if (acc.discountPrice <= 0) {
                let total = acc.price * acc.qty;
                return curVal + total
            } else {
                let total = acc.discountPrice * acc.qty;
                return curVal + total
            }

        }, 0)

        return totalPrice
    }

    const minus = (id: string) => {
        const cartClone = cart.concat();
        const foundIndex = cartClone.findIndex((item: any) => item.inventory._id === id);
        if (cartClone[foundIndex].qty <= 1) {

        } else {
            cartClone[foundIndex].qty -= 1
            setCart(cartClone)
            storeEncryptedCartItems(cartClone)
        }
    }

    useEffect(() => {
        const cart  = getDecryptedCartItems();
        if (cart.length <= 0) {
            navigate("/")
            errorNotify("Cart is empty!")
        }
        setCart(cart)

    }, [])


    const onRemoveItemHandler = (id: string) => {
        const cartClone = cart.concat();
        const foundIndex = cartClone.findIndex((item: any) => item.inventory._id === id);
        cartClone.splice(foundIndex, 1)
        setCart(cartClone)
        storeEncryptedCartItems(cartClone)
        if (cartClone.length <= 0) {
            navigate("/")
            errorNotify("Cart is empty!")
            removeCart()
            removeUserInfo()
        }

    }

    return (
        <React.Fragment>
            <Banner heading={'SHOP'} cssClass={'shop_main'} />
            <Container>
                <h5 className='mt-4'>Order Summary</h5>
                <div className='summary_container'>

                    <Table>
                        <tr>
                            <th>Product</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                        {cart.map((data: any) => {
                            return (
                               <CartItem key={data._id}
                                         data={data}
                                         minus={minus}
                                         plus={plus}
                                         onRemoveItemHandler={onRemoveItemHandler}
                                         editable={true}
                               />
                            )
                        })}
                    </Table>
                </div>
                <Row>
                    <Col md={12}>
                        <div className='Total_cost_container'>
                            <div>
                                <span>TotalCost</span>
                                <b>${getTotalPrice()}</b>
                            </div>
                            <div>
                                <button className='continue_shopping' onClick={() => navigate("/shop")}>CONTINUE SHOPPING</button>
                            </div>
                            <div>
                                <button className='next_step' onClick={()=> navigate("/address-data")}>PROCEED TO DELIVERY</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default OrderSummary
