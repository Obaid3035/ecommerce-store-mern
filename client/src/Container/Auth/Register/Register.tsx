import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Spinner } from 'react-bootstrap';
import './Register.scss';
import { useForm } from "react-hook-form";
import inputValidation from '../../../lib/Validation';
import {IRegister} from '../../../Interfaces'
import {signUp} from "../../../api/admin/auth";
import {setToken} from "../../../utils/helper";
import {errorNotify} from "../../../utils/toast";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegister>();

    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)
        const formData = {
            ...data,
            roleName: "customer"
        }
        signUp(formData)
            .then((res) => {
                setToken(res.data.token)
                setIsLoading(false)
                navigate('/customer/profile')
                reset()
            })
            .catch((e: any) => {
                setIsLoading(false)
                errorNotify(e.response.data.message)
            })
        reset()
    })

    return (
        <Container className='register_form'>
                <div className="text">
                    Register
                </div>
                <Form onSubmit={onSubmit}>
                    <div className='register_data'>
                        <Form.Group className="mb-3">
                            <label>Name</label>
                            <Form.Control type="text" {...register('name', inputValidation.name)} autoComplete='off' placeholder="Enter your name" />
                            <small className="text-danger"> {errors.name && errors.name.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Email</label>
                            <Form.Control type="email" {...register('email', inputValidation.email)} autoComplete='off' placeholder="Enter email address" />
                            <small className="text-danger"> {errors.email && errors.email.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Contact Number</label>
                            <Form.Control type="number" {...register('phoneNumber', inputValidation.contactNo)} autoComplete='off' placeholder="Enter contact number" />
                            <small className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Address</label>
                            <Form.Control type="text" {...register('address', inputValidation.address)} autoComplete='off' placeholder="Enter address" />
                            <small className="text-danger"> {errors.address && errors.address.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Password</label>
                            <Form.Control type="password" {...register('password', inputValidation.password)} autoComplete='off' placeholder="Enter password" />
                            <small className="text-danger"> {errors.password && errors.password.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Confirm Password</label>
                            <Form.Control type="password" {...register('confirmPassword', inputValidation.confirmPassword)} autoComplete='off' placeholder="Re-enter password" />
                            <small className="text-danger"> {errors.confirmPassword && errors.confirmPassword.message} </small>
                        </Form.Group>
                    </div>

                    <div className='text-center'>
                        {isLoading ? <Spinner className='mt-3' animation={'border'} /> :
                            <button className="main_register">
                                register
                            </button>
                        }
                    </div>
                    <p className='text-center'>Already have an account? <Link to="/login"><span className='sign_in'>SignIn</span></Link> </p>
                </Form>
            </Container>
    )
}
export default Register
