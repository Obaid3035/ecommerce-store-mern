import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import { useNavigate, useParams } from "react-router-dom";
import {
    createAttributes,
    getAttributesById,
    updateAttributes,
} from "../../../../../api/admin/attribute";

export type IAttributes = {
    name: string,
}

const CreateAttribute = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IAttributes>();
    const { id } = useParams();
    const isAddMode = !id;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            getAttributesById(id!)
              .then((res) => {
                  setValue("name", res.data.name)
              })
        }
    }, [])

    const onSubmitHandler = handleSubmit(async (data) => {
        setIsLoading(true);
        if (!isAddMode) {
            try {
                const attributes = await updateAttributes(data, id!);
                successNotify(attributes.data.message)
                setIsLoading(false);
                navigate("/admin/attributes")
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        } else {
            try {
                const attributes = await createAttributes(data);
                successNotify(attributes.data.message)
                setIsLoading(false);
                navigate("/admin/attributes")
                reset();
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        }
    })


    return (
        <div className={'page_responsive'}>
            <h3>{!isAddMode ? "Update" : "Create"} Attributes</h3>
            <div className={'create_product_btn'}>
                <Button onClick={() => navigate('/admin/attributes')}>Back</Button>
            </div>

            <Container fluid>
                <Row className={'category'}>
                    <Col md={6}>
                        <Form onSubmit={onSubmitHandler}>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <label>Attribute Name</label>
                                        <Form.Control {...register('name', inputValidation.name)} type="text" />
                                        <small className="text-danger"> {errors.name && errors.name.message} </small>
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    {
                                        !isLoading ?
                                          <Button type="submit">{!isAddMode ? "Update" : "Create"} Attribute</Button>
                                          : <Spinner animation={"border"} />
                                    }

                                </Col>
                            </Row>
                        </Form>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default CreateAttribute;
