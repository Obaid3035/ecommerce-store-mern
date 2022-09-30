import React, {useEffect, useState} from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import {useNavigate, useParams} from "react-router-dom";
import {createColor, getColorById, updateColor} from "../../../../../api/admin/color";

interface IColor {
    name: string,
    code: string
}

const CreateColor = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IColor>();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const isAddMode = !id;

    useEffect(() => {
        if (!isAddMode) {
            setIsLoading(true);
            getColorById(id!)
                .then((res) => {
                    setValue("name", res.data.name)
                    setValue("code", res.data.code)
                    setIsLoading(false);
                })
        }
    }, [])

    const onSubmitHandler = handleSubmit(async(data) => {
        setIsLoading(true);
        if (!isAddMode) {
            try {
                const color = await updateColor(data, id!);
                successNotify(color.data.message)
                setIsLoading(false);
                navigate("/admin/colors")
                reset();
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        } else  {
            try {
                const color = await createColor(data);
                successNotify(color.data.message)
                setIsLoading(false);
                navigate("/admin/colors")
                reset();
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        }

    })

    return (
        <div className={'page_responsive'}>
            <h3> Create Colors</h3>
            <div className={'create_product_btn'}>
                <Button onClick={() => navigate('/admin/colors')}>Back</Button>
            </div>

            {
                !isLoading ? (
                    <Container fluid>
                        <Row className={'category'}>
                            <Col md={6}>
                                <Form onSubmit={onSubmitHandler}>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group className="mb-3">
                                                <label>Color Name</label>
                                                <Form.Control {...register('name', inputValidation.colorName)} type="text" />
                                                <small className="text-danger"> {errors.name && errors.name.message} </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <label>Color Picker</label>
                                                <Form.Control {...register('code', inputValidation.colorPicker)} type="color" />
                                                <small className="text-danger"> {errors.code && errors.code.message} </small>
                                            </Form.Group>
                                        </Col>
                                        <Col md={8}>
                                            <Button type="submit"> Create Color</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>

                        </Row>
                    </Container>
                ) : (
                    <div className="text-center">
                        <Spinner animation={"border"} />
                    </div>
                )
            }
        </div>
    );
};

export default CreateColor;
