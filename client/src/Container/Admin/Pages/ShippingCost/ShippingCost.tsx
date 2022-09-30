import React, {useEffect, useState} from "react";
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import inputValidation from '../../../../lib/Validation';
import { ShippingInterface } from '../../../../Interfaces'
import {errorNotify, successNotify} from "../../../../utils/toast";
import { getShippingCost, updateShippingCost } from "../../../../api/admin/shippingCost";

const ShippingCost = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<ShippingInterface>();
    const [shippingId, setShippingId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getShippingCost()
          .then((res) => {
              setIsLoading(false)
              setValue("price", res.data.price);
              setValue("freeLimit", res.data.freeLimit);
              setShippingId(res.data._id)
          })
    }, [])

    const onSubmitHandler = handleSubmit((data) => {
        if (shippingId) {
            setIsLoading(true)
            updateShippingCost(data, shippingId)
                .then((res) => {
                    setIsLoading(false)
                    successNotify(res.data.message)
                })
        } else {
            errorNotify("Something went wrong")
        }
    })
    return (
        <div className={'page_responsive'}>
            <h3>Shipping Cost</h3>
            <Container>
                <Row>
                    <Col md={12}>
                        {
                            !isLoading ? (
                                <Form onSubmit={onSubmitHandler}>
                                    <Form.Group className="mb-3 mt-4">
                                        <Form.Control type="number" step="0.01" min="1" {...register('price', inputValidation.shippingCost)} placeholder="Enter flat rate shipping cost" />
                                        <small className="text-danger"> {errors.price && errors.price.message} </small>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mt-4">
                                        <Form.Control type="number" step="0.01" min="1" {...register('freeLimit', inputValidation.shippingCost)} placeholder="Enter Price limit for free shipping" />
                                        <small className="text-danger"> {errors.price && errors.price.message} </small>
                                    </Form.Group>
                                    <div>
                                        <Button type= "submit" className="all_btns">Save</Button>
                                    </div>
                                </Form>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation={"border"}/>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShippingCost;
