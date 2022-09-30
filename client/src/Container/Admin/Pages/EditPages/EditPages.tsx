import React  from 'react'
import { Container, Col, Row, Form,Button } from 'react-bootstrap'
import './EditPages.scss'
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"
import {errorNotify} from '../../../../utils/toast'
import { useNavigate } from "react-router-dom";


interface IEditPages {
    pagesCategory: {
        label: string,
        value: string
    }
}

const EditPages = () => {
    const navigation = useNavigate();
    const { handleSubmit, reset, control } = useForm<IEditPages>();
    const onSubmitHandler = handleSubmit((data) => {
        if (!data.pagesCategory) {
            errorNotify("Please select any page")
        }
        else {
            if (data.pagesCategory.value === 'homePage') {
                navigation("/admin/edit-home")
            } else if (data.pagesCategory.value === 'aboutUs') {
                navigation("/admin/edit-about")
            } else if (data.pagesCategory.value === 'footer') {
                navigation("/admin/edit-footer")
            } else if (data.pagesCategory.value === 'contact') {
                navigation("/admin/edit-contact")
            } else if (data.pagesCategory.value === 'term') {
                navigation("/admin/edit-term")
            } else if (data.pagesCategory.value === 'policy') {
                navigation("/admin/edit-policy")
            } else if (data.pagesCategory.value === 'faq') {
                navigation("/admin/edit-faq")
            }
            reset()
        }
    })
    const pageOptions = [
        { value: 'homePage', label: 'Home page' },
        { value: 'aboutUs', label: 'About Us' },
        { value: 'footer', label: 'Footer' },
        { value: 'contact', label: 'Contact' },
        { value: 'term', label: 'Term' },
        { value: 'policy', label: 'Policy' },
        { value: 'faq', label: 'Faq' },
    ]


    return (
        <div className='page_responsive'>
            <h3>Edit Pages</h3>
            <Container>
                <Row>
                    <Form onSubmit={onSubmitHandler}>
                        <Col md={9} className='mt-3'>
                            <label>Select the page you want to edit</label>
                            <Controller
                                name="pagesCategory"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            options={pageOptions}

                                        />
                                    );
                                }}
                            />
                            <div className='edit_page_container'>
                                <div>
                                    <Button type="submit" className='all_btns'>Edit Page</Button>
                                </div>
                                <div>
                                    <Button type="submit" className='all_btns'>Create New Page</Button>
                                </div>
                            </div>
                        </Col>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}
export default EditPages
