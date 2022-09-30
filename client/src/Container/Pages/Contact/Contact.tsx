import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import {Container, Col, Row, Form, Spinner} from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import inputValidation from '../../../lib/Validation';
import "./Contact.scss";
import {ContactInterface} from '../../../Interfaces'
import {showSeo} from "../../../api/seo";
import {Helmet} from "react-helmet";
import {ISeo} from "../../../Interfaces/site";
import {getContact} from "../../../api/cms";
import Loader from "../../../Component/Loader/Loader";

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInterface>();
    const [seo, setSeo] = useState<ISeo | null>(null);
    const [contact, setContact] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function fetchMyAPI() {
            const seoPromise = showSeo("CONTACT")

            const contactPromise = getContact()

            const [seo, contact] = await Promise.all([seoPromise, contactPromise])
            setIsLoading(false)
            setSeo(seo.data)
            setContact(contact.data)
        }

        fetchMyAPI();
    }, [])
    const onSubmitHandler = handleSubmit((data) => {
        console.log('success')
        reset()
    })



    if (isLoading) {
        return <Loader cms={true}/>
    }

    if (!isLoading && seo && contact) {
        return (
            <React.Fragment>
                {
                    seo.isSaved ? (
                        <Helmet>
                            <title>{seo.seo.pageTitle}</title>
                            <meta name={seo.seo.meta.title} content={seo.seo.meta.description} />
                        </Helmet>
                    ) : null
                }
                <div className={"about_main"} style={{
                    backgroundImage: `url(${contact?.section_1.image.avatar})`
                }}>
                    <div dangerouslySetInnerHTML={{__html: contact.section_1.text}}/>
                </div>
                <Container>
                    <Row>
                        <Col md={6} className='mt-4 border_box'>
                            <div className="get_in_touch_container">
                                <div dangerouslySetInnerHTML={{__html: contact.section_2.text}}/>
                            </div>
                            <div className='form_container'>
                                <h6> Send Message </h6>
                                <Form onSubmit={onSubmitHandler}>
                                    <Row>
                                        <Col md={6} className="mt-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Enter full name" {...register('name', inputValidation.name)} />
                                                <small className="text-danger"> {errors.name && errors.name.message} </small>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mt-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Enter email address" {...register('email', inputValidation.email)} />
                                                <small className="text-danger"> {errors.email && errors.email.message} </small>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Control as="textarea" rows={3} placeholder="Message" {...register('textMessage', inputValidation.textMessage)} />
                                                <small className="text-danger"> {errors.textMessage && errors.textMessage.message} </small>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12} className={'text-center'}>
                                            <button type="submit"> Submit </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <hr />
                            <div className='border_icons_container'>
                                <Col className='mt-3' md={3}>
                                    <Fab size="small" aria-label="home"> <HomeIcon  /> </Fab>
                                    <p> {contact.address} </p>
                                </Col>
                                <Col className='mt-3' md={3}>
                                    <Fab size="small" aria-label="Phone"> <PhoneIcon /> </Fab>
                                    <p> {contact.phoneNumber} </p>
                                </Col>
                                <Col className='mt-3' md={3}>
                                    <Fab size="small" aria-label="email"> <EmailIcon /> </Fab>
                                    <p> {contact.email} </p>
                                </Col>
                            </div>
                        </Col>
                        <Col className='mb-2' md={6}>
                            <div className="contact_image_container">
                                <img src={contact.section_2.image.avatar} alt={'img'} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/*<Brand />*/}
            </React.Fragment>
        )
    }




    return null
};
export default Contact;
