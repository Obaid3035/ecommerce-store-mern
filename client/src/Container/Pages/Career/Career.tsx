import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Spinner} from 'react-bootstrap'
import "./Career.scss";
import Banner from "../../../Component/Banner/Banner";
import { useForm, Controller } from "react-hook-form";
import {errorNotify} from "../../../utils/toast";
import inputValidation from '../../../lib/Validation';
import Select from "react-select";
import {JobApplication} from '../../../Interfaces'


const Career = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<JobApplication>();
    const [isLoading, setIsLoading] = useState(false)
    const [applied, setApplied] = useState<any>([])

    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)
        if(!data.applied) {
            setIsLoading(false)
            errorNotify('please select position')
        }
        else{
            setIsLoading(false)
            reset()
        }
    });
    useEffect(() => {
        setApplied([
            { value: 'C One', label: 'C One' },
            { value: 'C Two', label: 'C Two' },
            { value: 'C Three', label: 'C Three' }
        ])
    }, [])

    return (
        <React.Fragment>
            <Banner heading={'CAREERS'} cssClass={'about_main'} />
            <Container className='my-4'>
                <Row>
                    <Col md={6}>
                        <div className='text_container'>
                            <h2>Lorem Ipsum Is Dummy Text</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aliquid, aliquam autem dolores praesentium fugiat consequuntur doloribus molestias, odio eius esse architecto impedit nam a non delectus nesciunt earum. Molestiae!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non similique nobis enim ex molestias facere debitis eaque quo voluptatibus suscipit illo ea libero, velit temporibus natus molestiae, pariatur commodi illum.</p>
                            <hr />
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum libero nulla cumque magnam vitae dignissimos reprehenderit ratione dolore quis? Ipsum cupiditate molestias maiores alias magnam ex libero veritatis ratione saepe.</p>
                        </div>
                    </Col>
                    <Col className='mt-3 border-box' md={6}>
                        <div className='form_container'>
                            <Form onSubmit={onSubmit}>
                                <h4>Job Application</h4>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>First Name</label>
                                            <Form.Control type="text" placeholder="First name" {...register('firstname', inputValidation.firstname)} />
                                            <small className="text-danger"> {errors.firstname && errors.firstname.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>Last Name</label>
                                            <Form.Control type="text" placeholder="Last name" {...register('lastname', inputValidation.lastname)} />
                                            <small className="text-danger"> {errors.lastname && errors.lastname.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>Email</label>
                                            <Form.Control type="email" placeholder="Enter email address" {...register('email', inputValidation.email)} />
                                            <small className="text-danger"> {errors.email && errors.email.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>Phone</label>
                                            <Form.Control type="text" placeholder="Enter phone number" {...register('phone', inputValidation.phone)} />
                                            <small className="text-danger"> {errors.phone && errors.phone.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-0">
                                        <label className='label_text'>What position are you applying for?</label>
                                        <Controller
                                            name="applied"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        options={applied}
                                                        className="basic-multi-select mb-3"
                                                        classNamePrefix="select"
                                                        placeholder="Select any Position"
                                                    />
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>Available start date</label>
                                            <Form.Control {...register('date', inputValidation.date)} type="date" />
                                            <small className="text-danger"> {errors.date && errors.date.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <label className='label_text'>Upload file</label>
                                            <Form.Control type="file" {...register('image', inputValidation.image)} />
                                            <small className="text-danger"> {errors.image && errors.image.message} </small>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        {isLoading ? (
                                            <div className={'text-center'}>
                                                <Spinner animation={'border'} />
                                            </div>
                                        )  : <button className='submit_btn mt-4' type="submit"> Submit </button> }
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};
export default Career;
