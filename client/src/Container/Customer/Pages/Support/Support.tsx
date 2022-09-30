import React, { useState } from 'react'
import { Container, Col, Row, Form, Spinner,Button } from 'react-bootstrap'
import './Support.scss'
import { useForm } from "react-hook-form";
import inputValidation from '../../../../lib/Validation';
import {SupportInterface} from '../../../../Interfaces'

const Support = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SupportInterface>();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = handleSubmit((data) => {
        setIsLoading(true)
        reset()
    })
    return (
        <div className={'page_responsive'}>
            <h3>Contact Support</h3>
            <div className="main">
                <Container>
                    <Form onSubmit={onSubmitHandler}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" {...register('subject', inputValidation.subject)} autoComplete="off" placeholder="Subject" />
                                    <small className="text-danger"> {errors.subject && errors.subject.message} </small>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Control autoComplete="off" {...register('textMessage', inputValidation.textMessage)} as="textarea" rows={6} placeholder="Message" />
                                    <small className="text-danger"> {errors.textMessage && errors.textMessage.message} </small>
                                </Form.Group>
                                <div className='text-center'>
                                    {isLoading ? <Spinner className='mt-3' animation={'border'} /> :
                                        <Button type="submit" className="all_btns">Submit</Button>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div>

    )
}

export default Support;
