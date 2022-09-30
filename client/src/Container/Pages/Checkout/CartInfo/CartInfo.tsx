import React  from 'react'
import './CartInfo.scss'
import { Col, Row, Container } from 'react-bootstrap'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import {IoIosClose} from "react-icons/io"


interface IPaymentMethodComponent {
    cart: any,
    onRemoveCartItemHandler: (id: string) => void
}

const CartInfo: React.FC<IPaymentMethodComponent> = ({ cart, onRemoveCartItemHandler }) => {
    const navigate = useNavigate();

    return (
        <div className='Payment_container'>
            <hr />
            <h6>Your Cart</h6>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='summer_vibes_container'>
                            <table className="table">
                                <tbody>
                                {
                                    cart.map((data: any) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className='img_container' onClick={() => navigate(`/shop-description/${data._id}`)}>
                                                        <img src={data.avatar} alt='product_logo' />
                                                    </div>
                                                </td>
                                                <td>{data.name}</td>
                                                <td>{data.inventory.color}</td>
                                                <td>{data.inventory.size}</td>
                                                <td>{(data.discountPrice <= 0 ? data.price : data.discountPrice) * data.qty}</td>
                                                <td>{data.qty}</td>
                                                <td>
                                                    <span><IoIosClose onClick={() => onRemoveCartItemHandler(data.inventory._id)}/></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className='back_container'>
                <b onClick={() => navigate("/address-data")}>
                    <IoIosArrowRoundBack className='back_icon' />   Back
                </b>
            </div>

        </div>
    )
}

export default CartInfo
