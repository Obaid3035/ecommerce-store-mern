import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container, Form, Spinner} from 'react-bootstrap';
import './Login.scss';
import {useForm} from "react-hook-form";
import inputValidation from '../../../lib/Validation';
import {USER_ROLE} from "../../../App";
import {ILogin, LoginType} from '../../../Interfaces'
import {login} from "../../../api/admin/auth";
import {setToken} from "../../../utils/helper";
import {errorNotify} from "../../../utils/toast";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [loginType, setLoginType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm<ILogin>();

    useEffect(() => {
        switch (location.pathname) {
            case LoginType.customer:
                setValue("role", USER_ROLE.CUSTOMER)
                setLoginType(LoginType.customer)
                break;

            case LoginType.admin:
                setValue("role", USER_ROLE.ADMIN)
                setLoginType(LoginType.admin)
                break;
        }
    }, [location.pathname, setValue])

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        switch (loginType) {
            case LoginType.admin:
                try {
                    const adminAuth = await login(data);
                    setToken(adminAuth.data.token)
                    setIsLoading(false)
                    navigate('/admin/profile')
                    break;
                } catch (e: any) {
                    errorNotify(e.response.data.message)
                    setIsLoading(false)
                    break;
                }

            case LoginType.customer:
                try {
                    const customerAuth = await login(data);
                    setToken(customerAuth.data.token)
                    setIsLoading(false)
                    navigate('/')
                    break;
                } catch (e: any) {
                    errorNotify(e.response.data.message)
                    setIsLoading(false)
                    break;
                }
        }
        reset()
    })

    return (
        <Container className='login_form'>
            <div className="text">
                Login
            </div>
            <Form onSubmit={onSubmit}>
                <div className='data'>
                    <Form.Group className="mb-3">
                        <label>Email Address</label>
                        <Form.Control type="email" autoComplete='off' {...register('email', inputValidation.email)}
                                      placeholder="Enter email address"/>
                        <small className="text-danger"> {errors.email && errors.email.message} </small>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <label>Password</label>
                        <Form.Control type="password"
                                      autoComplete='off' {...register('password', inputValidation.password)}
                                      placeholder="Enter password"/>
                        <small className="text-danger"> {errors.password && errors.password.message} </small>
                    </Form.Group>
                </div>

                <Link to="/forget-password"><p className="forget_pass">Forgot Password?</p></Link>
                <div className='text-center'>
                    {isLoading ? <Spinner className='mt-3' animation={'border'}/> :
                        <button className="main_login">
                            login
                        </button>
                    }
                </div>
                {
                    loginType !== LoginType.admin ?
                        (
                            <div className="d-flex justify-content-between">
                                <p>Don't have an account? <Link to="/register"><span
                                    className='sign_up'>SignUp</span></Link></p>
                                <Link to="/admin/login"> <span className="sign_up">Admin</span></Link>
                            </div>
                        )
                        : null
                }
            </Form>
        </Container>
    )
}

export default Login
