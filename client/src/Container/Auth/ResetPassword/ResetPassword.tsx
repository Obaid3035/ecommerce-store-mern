import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from 'react-bootstrap'
import './ResetPassword.scss'
import { useForm } from "react-hook-form";
import inputValidation from '../../../lib/Validation';
import {IResetPass} from '../../../Interfaces';
import { errorNotify, successNotify } from "../../../utils/toast";
import { authenticate, resetPassword } from "../../../api/admin/auth";
import { useNavigate, useParams } from "react-router-dom";
import { getToken, removeToken } from "../../../utils/helper";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IResetPass>();
    const { id } = useParams()
    const isAddMode = !id;
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)
        if (data.password !== data.confirmPassword) {
            errorNotify("Password do not matches")
            setIsLoading(false)
        } else {
            if (!isAddMode) {
              resetPassword(data, id!)
                .then((res) => {
                  successNotify(res.data.message)
                  setIsLoading(false)
                  removeToken()
                  navigation("/")
                  reset()
                })
                  .catch((err: any) => {
                      setIsLoading(false)
                      errorNotify(err.response.data.message)
                  })
            } else {
              resetPassword(data, getToken()!)
                .then((res) => {
                  successNotify(res.data.message)
                  setIsLoading(false)
                  removeToken()
                  navigation("/")
                  reset()
                }) .catch((err: any) => {
                  setIsLoading(false)
                  errorNotify(err.response.data.message)
              })
            }
        }
        reset()
    })

    useEffect(() => {
        if (!isAddMode) {
            authenticate(id!)
              .then((res) => {
                  if (!res.data.authenticate) {
                      window.location.href = '/'
                  }
              })
              .catch((err) => {
                navigation("/")
                  errorNotify("Session Expired")
              })
        }
    }, [])
    return (
        <React.Fragment>
            <Container className='reset_form'>
                <div className="text">
                    Update Password
                </div>
                <Form onSubmit={onSubmit}>
                    <div className='reset_data'>

                        <Form.Group className="mb-3">
                            <label>Old Password</label>
                            <Form.Control type="password" {...register('oldPassword', inputValidation.password)} placeholder="Enter your old password" />
                            <small className="text-danger"> {errors.password && errors.password.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <label>Password</label>
                            <Form.Control type="password" {...register('password', inputValidation.password)} placeholder="Enter your new password" />
                            <small className="text-danger"> {errors.password && errors.password.message} </small>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label>New Password</label>
                            <Form.Control type="password" {...register('confirmPassword', inputValidation.confirmPassword)} placeholder="Re-enter your password" />
                            <small className="text-danger"> {errors.confirmPassword && errors.confirmPassword.message} </small>
                        </Form.Group>
                    </div>
                    <div className='text-center'>
                        {isLoading ? <Spinner className='mt-3' animation={'border'} /> :
                            <button className="reset_btn">
                                Change password
                            </button>
                        }
                    </div>
                </Form>
            </Container>
        </React.Fragment>
    )
}
export default ResetPassword;
