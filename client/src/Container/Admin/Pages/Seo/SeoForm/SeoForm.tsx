import React, {useEffect, useState} from 'react'
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import inputValidation from '../../../../../lib/Validation';
import {createSeo, showSeo} from "../../../../../api/seo";
import {errorNotify, successNotify} from "../../../../../utils/toast";

export interface ISeoInterface {
    title: string,
    description: string,
    pageTitle: string
}

const SeoForm: React.FC<{ page: string}> = ({ page }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ISeoInterface>();

    useEffect(() => {
        setIsLoading(true)
        showSeo(page)
            .then((res) => {
                setIsLoading(false)
                if (res.data.isSaved) {
                    setValue("pageTitle", res.data.seo.pageTitle)
                    setValue("title", res.data.seo.meta.title)
                    setValue("description", res.data.seo.meta.description)
                }
            })
            .catch((err: any) => {
                errorNotify(err.response.data.message)
                setIsLoading(false)
            })
    }, [])

    const onSubmitHandler = handleSubmit(async (data) => {
        try {
            setIsLoading(true)
            const formData = {
                page: page,
                pageTitle: data.pageTitle,
                meta: {
                    title: data.title,
                    description: data.description,
                }
            }

            const seo = await createSeo(formData);
            successNotify(seo.data.message)
            setIsLoading(false)
        } catch (err: any) {
            errorNotify(err.response.data.message)
            setIsLoading(false)
        }

    })



    let data = (
        <div className="text-center">
            <Spinner animation={"border"}/>
        </div>
    )

    if(!isLoading) {
        data = (
            <Form  onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" {...register('pageTitle', inputValidation.metaDescription)} placeholder="Page Title" />
                    <small className="text-danger"> {errors.pageTitle && errors.pageTitle.message} </small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" {...register('title', inputValidation.metaTitle)} placeholder="Meta title" />
                    <small className="text-danger"> {errors.title && errors.title.message} </small>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" {...register('description', inputValidation.metaDescription)} placeholder="Meta Description" />
                    <small className="text-danger"> {errors.description && errors.description.message} </small>
                </Form.Group>

                <div className='save_btn_container'>
                    <Button className="all_btns" type="submit">Save</Button>
                </div>
            </Form>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={9}>
                    <div className="mt-4">
                        { data }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default SeoForm
