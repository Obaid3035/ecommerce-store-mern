import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import Card5 from "../../assets/img/card5.jpg";
import { useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../utils/toast";
import inputValidation from '../../lib/Validation';
import "./Profile.scss";
import { ICreateProfile } from '../../Interfaces'
import {useNavigate} from 'react-router-dom';
import { getProfile, updateProfile } from "../../api/admin/auth";
import ShippingAddress from "../../Container/Customer/Pages/Profile/ShippingAddress/ShippingAddress";

interface IProfile {
    isAdmin: boolean,
    heading: string
}


const Profile: React.FC<IProfile> = ({ isAdmin, heading }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ICreateProfile>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<null | File>(null);
    const [preview, setPreview] = useState<any>(null);

    useEffect(() => {
        setIsLoading(true);
        getProfile()
            .then((res) => {
                setIsLoading(false);
                setValue("name", res.data.name);
                setValue("phoneNumber", res.data.phoneNumber)
                setValue("address", res.data.address)
                setValue("email", res.data.email)
                setPreview(res.data.profilePicture.avatar)
            })
    }, [])

    const onSubmitHandler = handleSubmit( async (data) => {
        setIsLoading(true);
        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("phoneNumber", data.phoneNumber);
                formData.append("address", data.address);
                formData.append("profilePicture", selectedFile)
                const profile  = await updateProfile(formData)
                successNotify(profile.data.message)
                setIsLoading(false)
            } else {
                const formData = {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    address: data.address
                }
                const profile  = await updateProfile(formData)
                successNotify(profile.data.message)
                setIsLoading(false)
            }

        } catch (e: any) {
            errorNotify(e.response.data.message)
            setIsLoading(false)
        }
    })

    let data = (
        <div className="text-center">
            <Spinner className='mt-3' animation={'border'} />
        </div>
    )

    if(!isLoading) {
        data = (
            <Form onSubmit={onSubmitHandler}>
                <Row className={'profile_section'}>
                    <Col md={9} className={'profile_img mb-2'}>
                        <img src={preview ? preview : Card5} alt={'profile_img'} />
                    </Col>
                    <Col md={9} className={'d-flex justify-content-end mb-5 p-0'}>
                        <div className={'input_file'}>
                            <input
                                type="file"
                                id="file-input"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    setSelectedFile(e.target.files![0])
                                    setPreview(URL.createObjectURL(e.target.files![0]))
                                }}
                                className="file_input" />
                            <label className="file_label" htmlFor="file-input">
                                <FiUpload />
                                <span>Upload your photo</span>
                            </label>
                        </div>
                    </Col>
                    <Col md={9}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" {...register('name', inputValidation.name)} placeholder="Enter your Name" />
                            <small className="text-danger"> {errors.name && errors.name.message} </small>
                        </Form.Group>
                    </Col>
                    <Col md={9}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" disabled {...register('email', inputValidation.email)} placeholder="Enter your Email" />
                            <small className="text-danger"> {errors.email && errors.email.message} </small>
                        </Form.Group>
                    </Col>
                    <Col md={9}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" {...register('phoneNumber', inputValidation.contactNo)} placeholder="Enter your Contact Number" />
                            <small className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                        </Form.Group>
                    </Col>
                    <Col md={9}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" {...register('address', inputValidation.address)} placeholder="Enter your Address" />
                            <small className="text-danger"> {errors.address && errors.address.message} </small>
                        </Form.Group>
                    </Col>

                    <Col md={9}>
                        <div className='text-center'>

                            <Button className='all_btns' type="submit">
                                Save Changes
                            </Button>

                        </div>

                        <div>
                            <Button className='all_btns mx-2' onClick={()=> navigate("/" + (isAdmin ? "admin" : "customer") + "/reset-password")}>Change Password</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }

    return (
        <div className={'page_responsive'}>
            <h3>{heading}</h3>
            <Container>
                { data }
                {
                    !isAdmin ? (
                        <React.Fragment>
                            <h3>Shipping Address</h3>
                            <Row className={"justify-content-center"}>
                                <Col md={8}>
                                    <ShippingAddress/>
                                </Col>
                            </Row>
                        </React.Fragment>
                    ) : null
                }
            </Container>
        </div>
    );
};
export default Profile;
