import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../../SubCategory/SubCategory.scss";
import { useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import { ICategories } from '../../../../../Interfaces'
import { useNavigate, useParams } from "react-router-dom";
import {createParentCategory, getParentCategoryById, updateParentCategory} from "../../../../../api/admin/parentCategory";

const CreateParentCategory = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ICategories>();
    const { id } = useParams();
    const isAddMode = !id;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            getParentCategoryById(id!)
              .then((res) => {
                  setValue("name", res.data.name)
              })
        }
    }, [])

    const onSubmitHandler = handleSubmit( async (data) => {
        setIsLoading(true);
        if (!isAddMode) {
            try {
                const category = await updateParentCategory(data, id!);
                successNotify(category.data.message)
                setIsLoading(false);
                navigate("/admin/product-type")
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        } else {
            try {
                const category = await createParentCategory(data);
                successNotify(category.data.message)
                setIsLoading(false);
                navigate("/admin/product-type")
                reset();
            } catch (e: any) {
                errorNotify(e.response.data.message);
                setIsLoading(false);
            }
        }
    })

    return (
        <div className={'page_responsive'}>
            <h3>{!isAddMode ? "Update" : "Create"} Parent Category</h3>
            <div className={'create_product_btn'}>
                <Button onClick={() => navigate('/admin/product-type')}>Back</Button>
            </div>

            <Container fluid>
                <Row className={'category'}>
                    <Col md={6}>
                        <Form onSubmit={onSubmitHandler}>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <label>Name</label>
                                        <Form.Control {...register('name', inputValidation.name)} type="text" />
                                        <small className="text-danger"> {errors.name && errors.name.message} </small>
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    {
                                        !isLoading ?
                                          <Button type="submit">{!isAddMode ? "Update" : "Create"} Parent Category</Button>
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

export default CreateParentCategory;
