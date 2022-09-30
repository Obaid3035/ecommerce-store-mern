import React, { useState } from 'react'
import { Container, Form,Spinner} from 'react-bootstrap'
import './ForgetPassword.scss'
import { useForm } from "react-hook-form";
import inputValidation from '../../../lib/Validation';
import {IForgotPass} from '../../../Interfaces'
import { forgetPassword } from "../../../api/admin/auth";
import {errorNotify, successNotify} from "../../../utils/toast";

const ForgotPass = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForgotPass>();
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)
        forgetPassword(data)
          .then((res) => {
              setIsLoading(false)
              successNotify(res.data.message)
          })
            .catch((err) => {
                setIsLoading(false)
                errorNotify(err.response.data.message)
            })
        reset()
    })
    return (
        <React.Fragment>
            <Container className='forget_form'>
                <div className="text">
                    Forgot Password?
                </div>
                <Form onSubmit={onSubmit}>
                    <div className='forgot_data'>
                        <Form.Group className="mb-3">
                            <label>Email Address</label>
                            <Form.Control type="email" autoComplete='off' {...register('email', inputValidation.email)} placeholder="Enter recovery email address" />
                            <small className="text-danger"> {errors.email && errors.email.message} </small>
                        </Form.Group>
                    </div>
                    <div className='text-center'>
                        {isLoading ? <Spinner className='mt-3' animation={'border'} /> :
                            <button className="main_forgot">
                                Recover Password
                            </button>
                        }
                    </div>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default ForgotPass
