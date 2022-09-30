import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import './ShippingAddress.scss'
import {IoIosArrowRoundBack} from 'react-icons/io'
import Banner from "../../../Component/Banner/Banner";
import Select from "react-select";
import {useNavigate} from 'react-router-dom';
import {Controller, useForm} from "react-hook-form";
import inputValidation from "../../../lib/Validation";
import {getCurrentUser, getDecryptedCustomerInfo, storeEncryptedCustomerInfo} from "../../../utils/helper";
import {getShippingDetail, getTaxOption} from "../../../api/order";

interface IPersonalInformation {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    state: {
        label: string,
        value: string
    },
    email: string

    billingFirstName: string;
    billingLastName: string;
    billingAddress: string;
    billingCity: string;
    billingPostalCode: string;
    billingPhoneNumber: string;
    billingState: {
        label: string,
        value: string
    },
    billingEmail: string
}

const ShippingAddress = () => {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm<IPersonalInformation>();
    const [sameAsShippingAddress, setSameAsShippingAddress] = useState<boolean>(false);
    const [taxOptions, setTaxOptions] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        getTaxOption()
            .then((res) => {
                setTaxOptions(res.data)
            })
        const customerInfo = getDecryptedCustomerInfo()
        if (customerInfo) {

            setValue("firstName", customerInfo.userInfo.firstName)
            setValue("lastName", customerInfo.userInfo.lastName)
            setValue("address", customerInfo.userInfo.address)
            setValue("email", customerInfo.userInfo.email)
            setValue("postalCode", customerInfo.userInfo.postalCode)
            setValue("city", customerInfo.userInfo.city)
            setValue("phoneNumber", customerInfo.userInfo.phoneNumber)
            setValue("state", {
                value: customerInfo.userInfo.state._id,
                label: customerInfo.userInfo.state.name,
            })
            setSameAsShippingAddress(customerInfo.sameAsShippingAddress)
          if (!customerInfo.sameAsShippingAddress) {
              setValue("billingFirstName", customerInfo.billingAddress.firstName)
              setValue("billingLastName", customerInfo.billingAddress.lastName)
              setValue("billingAddress", customerInfo.billingAddress.address)
              setValue("billingEmail", customerInfo.billingAddress.email)
              setValue("billingPostalCode", customerInfo.billingAddress.postalCode)
              setValue("billingCity", customerInfo.billingAddress.city)
              setValue("billingPhoneNumber", customerInfo.billingAddress.phoneNumber)
              setValue("billingState", {
                  value: customerInfo.billingAddress.state._id,
                  label: customerInfo.billingAddress.state.name,
              })
          }
        } else {
            if (getCurrentUser()) {
                getShippingDetail()
                    .then((res) => {
                        if(res.data.shippingSaved) {
                            setValue("firstName", res.data.shipping.firstName)
                            setValue("lastName", res.data.shipping.lastName)
                            setValue("address", res.data.shipping.address)
                            setValue("email", res.data.shipping.email)
                            setValue("postalCode", res.data.shipping.postalCode)
                            setValue("city", res.data.shipping.city)
                            setValue("phoneNumber", res.data.shipping.phoneNumber)
                            setValue("state", {
                                value: res.data.shipping.state._id,
                                label: res.data.shipping.state.name,
                            })
                        }
                    })
            }
        }
    }, [])

    const onFormSubmit = handleSubmit((data) => {
        let d: any = {
            userInfo: {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                email: data.email,
                postalCode: data.postalCode,
                city: data.city,
                phoneNumber: data.phoneNumber,
                state: {
                    _id: data.state.value,
                    name: data.state.label
                }
            },
            sameAsShippingAddress
        }
        if (!sameAsShippingAddress) {
            d = {
                ...d,
                billingAddress: {
                    firstName: data.billingFirstName,
                    lastName: data.billingLastName,
                    address: data.billingAddress,
                    email: data.billingEmail,
                    postalCode: data.billingPostalCode,
                    city: data.billingCity,
                    phoneNumber: data.billingPhoneNumber,
                    state: {
                        _id: data.billingState.value,
                        name: data.billingState.label
                    }
                }
            }
        }
       storeEncryptedCustomerInfo(d)
       navigate("/payment-method")
    })

    return (
        <React.Fragment>
            <Banner heading={'SHOP'} cssClass={'shop_main'}/>
            <Container>
                <Form onSubmit={onFormSubmit}>
                    <Row className='mt-3'>
                        <Col md={6}>
                            <div className='address_form_container'>
                                <h3>Shipping Address</h3>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>First Name</label>
                                            <Form.Control
                                                type="text" {...register('firstName', inputValidation.firstname)}
                                                placeholder="Enter first name"/>
                                            <small
                                                className="text-danger"> {errors.firstName && errors.firstName.message} </small>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>Last Name</label>
                                            <Form.Control
                                                type="text" {...register('lastName', inputValidation.lastname)}
                                                placeholder="Enter last name"/>
                                            <small
                                                className="text-danger"> {errors.lastName && errors.lastName.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>Address</label>
                                            <Form.Control type="text" {...register('address', inputValidation.address)}
                                                          placeholder="Enter your address"/>
                                            <small
                                                className="text-danger"> {errors.address && errors.address.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>City</label>
                                            <Form.Control type="text" {...register('city', inputValidation.city)}
                                                          placeholder="Enter your city"/>
                                            <small
                                                className="text-danger"> {errors.city && errors.city.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>Postal Code/ZIP</label>
                                            <Form.Control
                                                type="number" {...register('postalCode', inputValidation.firstname)}
                                                placeholder="Enter your postal code"/>
                                            <small
                                                className="text-danger"> {errors.postalCode && errors.postalCode.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>Phone number</label>
                                            <Form.Control
                                                type="number" {...register('phoneNumber', inputValidation.phone)}
                                                placeholder="Enter your phone number"/>
                                            <small
                                                className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <label>State</label>
                                        <Controller
                                            name="state"
                                            control={control}
                                            render={({field}) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        options={taxOptions.sort((a:any , b:any) => a.label.localeCompare(b.label))}
                                                        className="basic-multi-select mb-3"
                                                        classNamePrefix="select"
                                                        placeholder="Select SubCategory"
                                                    />
                                                );
                                            }}
                                        />

                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label>E-mail</label>
                                            <Form.Control type="text" {...register('email', inputValidation.email)}
                                                          placeholder="Enter your email"/>
                                            <small
                                                className="text-danger"> {errors.email && errors.email.message} </small>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className='steps_container'>
                                <div>
                                <span onClick={() => navigate("/order-summary")}>
                                    <IoIosArrowRoundBack className='back_icon'/>   Back
                                </span>
                                </div>
                                <div className='btns_container'>
                                    <div>
                                        <button className='continue_shopping'>CONTINUE SHOPPING</button>
                                    </div>
                                    <div>
                                        <button className='next_step' type={"submit"}>PROCEED TO PAYMENT</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='address_form_container'>
                                <h3>Billing Address</h3>
                                {
                                    !sameAsShippingAddress ? (
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        type="text" {...register('billingFirstName', inputValidation.firstname)}
                                                        placeholder="Enter first name"/>
                                                    <small
                                                        className="text-danger"> {errors.firstName && errors.firstName.message} </small>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        type="text" {...register('billingLastName', inputValidation.lastname)}
                                                        placeholder="Enter last name"/>
                                                    <small
                                                        className="text-danger"> {errors.lastName && errors.lastName.message} </small>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>Address</label>
                                                    <Form.Control type="text" {...register('billingAddress', inputValidation.address)}
                                                                  placeholder="Enter your address"/>
                                                    <small
                                                        className="text-danger"> {errors.address && errors.address.message} </small>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>City</label>
                                                    <Form.Control type="text" {...register('billingCity', inputValidation.city)}
                                                                  placeholder="Enter your city"/>
                                                    <small
                                                        className="text-danger"> {errors.city && errors.city.message} </small>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>Postal Code/ZIP</label>
                                                    <Form.Control
                                                        type="number" {...register('billingPostalCode', inputValidation.firstname)}
                                                        placeholder="Enter your postal code"/>
                                                    <small
                                                        className="text-danger"> {errors.postalCode && errors.postalCode.message} </small>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>Phone number</label>
                                                    <Form.Control
                                                        type="number" {...register('billingPhoneNumber', inputValidation.phone)}
                                                        placeholder="Enter your phone number"/>
                                                    <small
                                                        className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <label>State</label>
                                                <Controller
                                                    name="billingState"
                                                    control={control}
                                                    render={({field}) => {
                                                        return (
                                                            <Select
                                                                {...field}
                                                                options={taxOptions.sort((a:any , b:any) => a.label.localeCompare(b.label))}
                                                                className="basic-multi-select mb-3"
                                                                classNamePrefix="select"
                                                                placeholder="Select SubCategory"
                                                            />
                                                        );
                                                    }}
                                                />

                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <label>E-mail</label>
                                                    <Form.Control type="text" {...register('billingEmail', inputValidation.email)}
                                                                  placeholder="Enter your email"/>
                                                    <small
                                                        className="text-danger"> {errors.email && errors.email.message} </small>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    ) : null
                                }
                                <Form.Check
                                    type={"checkbox"}
                                    checked={sameAsShippingAddress}
                                    onChange={(e) => setSameAsShippingAddress(e.target.checked)}
                                    label={"Same as shipping address"}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </React.Fragment>
    )
}
export default ShippingAddress
