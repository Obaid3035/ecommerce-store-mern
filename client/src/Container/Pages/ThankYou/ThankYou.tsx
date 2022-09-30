import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Button, Form, Spinner} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import './ThankYou.scss'
import { AiOutlineCheck } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {createReview, verifyOrder} from "../../../api/review";
import {getCurrentUser} from "../../../utils/helper";
import {successNotify} from "../../../utils/toast";

interface IThankYou {
    text: string
}

const ThankYou = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm<IThankYou>();
    const [isLoading, setIsLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setCurrentUser(getCurrentUser()._id)
        verifyOrder(id!)
            .then((res) => {
                setOrderId(res.data.orderId)
                if (!res.data.order) {
                    window.location.href = "/"
                }
                setIsLoading(false)
            })
    }, [])

    const onSubmitHandler = handleSubmit( async (data) => {
        setIsLoading(true)
        if (orderId) {
            await createReview(currentUser ?
                {
                user: currentUser,
                ...data
            } : data, orderId)
        }
        setIsLoading(false)
        successNotify("Thank you for your feedback!")
        navigate("/")
        reset()
    })
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col md={12}>
                                <div className='thankyou_container text-center'>
                                    {
                                        !isLoading ? (
                                            <React.Fragment>
                                                <span><AiOutlineCheck className='check_icon' /></span>
                                                <p className='m-0'>Thank You!</p>
                                                <span>Order Successfully Placed</span>
                                                <div className='mt-4'>
                                                    <b>Your order ID: <span>{id!}</span></b>
                                                    <p>Your order will be delivered to you within 5 working days</p>
                                                </div>
                                                {
                                                    currentUser ? (
                                                        <div className="p-3 mt-2">
                                                            <Form onSubmit={onSubmitHandler}>
                                                                <Row>
                                                                    <Col md={9}>
                                                                        <Form.Group className="mb-3">
                                                                            <Form.Control as="textarea" required rows={3} placeholder="Enter your feedback" {...register('text')} />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md={3}>
                                                                        <Button type="submit" className='mt-4'>Submit</Button>
                                                                    </Col>
                                                                </Row>

                                                            </Form>
                                                        </div>
                                                    ) : null
                                                }
                                                <Button onClick={() => navigate("/")}>Return To Home</Button>
                                            </React.Fragment>
                                        ) : (
                                            <div className="text-center">
                                                <Spinner animation={"border"}/>
                                            </div>
                                        )
                                    }

                                </div>
                    </Col>
                </Row>

            </Container >
        </React.Fragment >
    )
}

export default ThankYou
