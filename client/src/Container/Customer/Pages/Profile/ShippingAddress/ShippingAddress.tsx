import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Spinner} from "react-bootstrap";
import inputValidation from '../../../../../lib/Validation';
import { useForm, Controller } from "react-hook-form"
import Select from 'react-select';
import {getShippingCost} from "../../../../../api/shippingCost";
import {createShippingDetails, getTaxOption} from "../../../../../api/order";
import {getCurrentUser} from "../../../../../utils/helper";
import {errorNotify, successNotify} from "../../../../../utils/toast";


interface IShippingAddress {
    firstName: string | null,
    lastName: string | null,
    address: string | null,
    city: string | null,
    postalCode: string | null,
    phoneNumber: string | null,
    state: {
        label: string,
        value: string
    } | null,
    email: string | null
}

const ShippingAddress = () => {
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<IShippingAddress>();
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getTaxOption()
            .then((res) => {
                setState(res.data)
            })
        getShippingCost()
            .then((res) => {
                setIsLoading(false)
                if(res.data.shippingSaved) {
                    setValue("firstName", res.data.shipping.firstName);
                    setValue("lastName", res.data.shipping.lastName);
                    setValue("address", res.data.shipping.address);
                    setValue("city", res.data.shipping.city);
                    setValue("postalCode", res.data.shipping.postalCode);
                    setValue("phoneNumber", res.data.shipping.phoneNumber);
                    setValue("email", res.data.shipping.email);
                    setValue("state", {
                        value: res.data.shipping.state._id,
                        label: res.data.shipping.state.name,
                    })
                }
            })



    }, [])

    const onSubmitHandler =  handleSubmit( async (data) => {
        setIsLoading(true)
        try {
            const userInfo = {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                email: data.email,
                postalCode: data.postalCode,
                city: data.city,
                phoneNumber: data.phoneNumber,
                state: {
                    _id: data.state!.value,
                    name: data.state!.label
                },
                user: getCurrentUser()._id
            }
            const res = await createShippingDetails(userInfo)
            setIsLoading(false)
            successNotify(res.data.message)
        } catch (e: any) {
            setIsLoading(false)
            errorNotify(e.response.data.message)
        }
    })


    return (

        <Form onSubmit={onSubmitHandler}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>First Name</label>
                        <Form.Control
                            type="text" {...register('firstName', inputValidation.firstname)}
                            placeholder="Enter first name" />
                        <small
                            className="text-danger"> {errors.firstName && errors.firstName.message} </small>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>Last Name</label>
                        <Form.Control
                            type="text"  {...register('lastName', inputValidation.lastname)}
                            placeholder="Enter last name" />
                        <small
                            className="text-danger"> {errors.lastName && errors.lastName.message} </small>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>Address</label>
                        <Form.Control type="text"  {...register('address', inputValidation.address)}
                                      placeholder="Enter your address" />
                        <small
                            className="text-danger"> {errors.address && errors.address.message} </small>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>City</label>
                        <Form.Control type="text" {...register('city', inputValidation.city)}
                                      placeholder="Enter your city" />
                        <small
                            className="text-danger"> {errors.city && errors.city.message} </small>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>Postal Code/ZIP</label>
                        <Form.Control
                            type="number"  {...register('postalCode', inputValidation.firstname)}
                            placeholder="Enter your postal code" />
                        <small
                            className="text-danger"> {errors.postalCode && errors.postalCode.message} </small>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>Phone number</label>
                        <Form.Control
                            type="number" {...register('phoneNumber', inputValidation.phone)}
                            placeholder="Enter your phone number" />
                        <small
                            className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <label>State</label>
                    <Controller
                        name="state"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Select
                                    {...field}
                                    options={state.sort((a:any , b:any) => a.label.localeCompare(b.label))}
                                    className="basic-multi-select mb-3"
                                    classNamePrefix="select"
                                    placeholder="Select State"
                                />
                            );
                        }}
                    />

                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <label>E-mail</label>
                        <Form.Control type="text"  {...register('email', inputValidation.email)}
                                      placeholder="Enter your email" />
                        <small
                            className="text-danger"> {errors.email && errors.email.message} </small>
                    </Form.Group>
                </Col>

                {
                    !isLoading ? (
                        <Col md={12}>
                            <button className='btn' type='submit'> Submit </button>
                        </Col>
                    ) : (
                        <div className="text-center">
                            <Spinner animation={"border"}/>
                        </div>
                    )
                }
            </Row>
        </Form>

    )
}

export default ShippingAddress
