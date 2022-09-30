import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../SubCategory.scss";
import {Controller, useForm} from "react-hook-form";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import { ICategories } from '../../../../../Interfaces'
import { useNavigate, useParams } from "react-router-dom";
import {
    createSubCategories,
    getSubCategoryById,
    updateSubCategories
} from "../../../../../api/admin/category";
import Select from "react-select";
import {getParentCategoryOptions} from "../../../../../api/admin/parentCategory";

const CreateSubCategory = () => {
    const navigate = useNavigate()
    const [parentCategoryOption, setParentCategoryOption] = useState([])

    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<ICategories>();
    const { id } = useParams();
    const isAddMode = !id;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getParentCategoryOptions()
            .then((parentCategory) => {
                setParentCategoryOption(parentCategory.data)
                if (!isAddMode) {
                    getSubCategoryById(id!)
                        .then((res) => {
                            setValue("name", res.data.name)
                            setValue("parentCategory", parentCategory.data.find((category: any) => category.value == res.data.parentCategory))
                        })
                }
            })



    }, [])

    const onSubmitHandler = handleSubmit( async (data) => {
        setIsLoading(true);
        if (!data.parentCategory) {
            errorNotify("Please select a parent category")
            setIsLoading(false);
        } else {
            const formData = {
                name: data.name,
                parentCategory: data.parentCategory.value
            }
            if (!isAddMode) {
                try {
                    const category = await updateSubCategories(formData, id!);
                    successNotify(category.data.message)
                    setIsLoading(false);
                    navigate("/admin/categories")
                } catch (e: any) {
                    errorNotify(e.response.data.message);
                    setIsLoading(false);
                }
            } else {
                try {
                    const category = await createSubCategories(formData);
                    successNotify(category.data.message)
                    setIsLoading(false);
                    navigate("/admin/categories")
                    reset();
                } catch (e: any) {
                    errorNotify(e.response.data.message);
                    setIsLoading(false);
                }
            }
        }

    })

    return (
        <div className={'page_responsive'}>
            <h3>{!isAddMode ? "Update" : "Create"} Sub Categories</h3>
            <div className={'create_product_btn'}>
                <Button onClick={() => navigate('/admin/categories')}>Back</Button>
            </div>

            <Container fluid>
                <Row className={'category'}>
                    <Col md={12}>
                        <Form onSubmit={onSubmitHandler}>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <label>Category Name</label>
                                        <Form.Control {...register('name', inputValidation.name)} type="text" />
                                        <small className="text-danger"> {errors.name && errors.name.message} </small>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Select Parent Category</Form.Label>
                                    <Controller
                                        name="parentCategory"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    options={parentCategoryOption}
                                                    className="basic-multi-select mb-3"
                                                    classNamePrefix="select"
                                                    placeholder="Select Parent Category"
                                                />
                                            );
                                        }}
                                    />
                                </Col>
                                <Col md={8}>
                                    {
                                        !isLoading ?
                                          <Button type="submit">{!isAddMode ? "Update" : "Create"} Category</Button>
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

export default CreateSubCategory;
