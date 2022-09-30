import React, {useEffect, useState} from 'react';
import {Card, Form, Spinner} from "react-bootstrap";
import ReactQuill from "react-quill";
import "../EditAbout/EditAbout.scss"
import {getContact, updateContact} from "../../../../../api/cms";
import {IAbout, IContact} from "../../../../../Interfaces";
import {successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";


const EditContact = () => {


    const [isLoading, setIsLoading] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        email: "",
        phoneNumber: "",
        address: ""
    })

    useEffect(() => {
        setIsLoading(true)
        getContact()
            .then((res: {
                data: IContact
            }) => {

                setContactInfo({
                    email: res.data.email,
                    address: res.data.address,
                    phoneNumber: res.data.phoneNumber
                })
                setPreviewImages({
                    ...previewImages,
                    preview_1: res.data.section_1.image.avatar,
                    preview_2: res.data.section_2.image.avatar,
                })

                setQuillData({
                    ...quillData,
                    section_1_text: res.data.section_1.text,
                    section_2_text: res.data.section_2.text,
                })
                setIsLoading(false)
            })
    }, [])

    const [aboutImages, setAboutImages] = useState({
        section_1_image: null,
        section_2_image: null,
    })

    const [previewImages, setPreviewImages] = useState<any>({
        preview_1: null,
        preview_2: null,
    })

    const [quillData, setQuillData] = useState<any>({})

    const onChangeHandler = (e: any, img: string, preview: string) => {
        setAboutImages({
            ...aboutImages,
            [img]: e.target.files[0]
        })

        let previewUrl = URL.createObjectURL(e.target.files[0])
        setPreviewImages({
            ...previewImages,
            [preview]: previewUrl
        })

    }

    const onEditorStateChange = (editorState: any, name: string) => {
        setQuillData({
            ...quillData,
            [name]: editorState
        })
    };
    const saveTextHandler = async () => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append("section_1_text", quillData.section_1_text)
            formData.append("section_2_text", quillData.section_2_text)
            formData.append("email", contactInfo.email)
            formData.append("phoneNumber", contactInfo.phoneNumber)
            formData.append("address", contactInfo.address)

            if(aboutImages.section_1_image) {
                formData.append("section_1_image", aboutImages.section_1_image)
            }
            if(aboutImages.section_2_image) {
                formData.append("section_2_image", aboutImages.section_2_image)
            }

            const home = await updateContact(formData)
            successNotify(home.data.message)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }


    return (
        <div className="page_responsive">
            {
                !isLoading ?
                    (
                        <React.Fragment>
                            <h2 className='mb-3'>Contact Edit Page</h2>


                            <div className={'mb-3'}>
                                <h3>Section 1</h3>
                                <div className={'main_section'}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillData.section_1_text}
                                        onChange={(e) => onEditorStateChange(e, 'section_1_text')}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_1_image", "preview_1")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 1920 * 540 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_1 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_1}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className={'my-5'}>
                                <h3>Section 2</h3>

                                <div className={'main_section'}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillData.section_2_text}
                                        onChange={(e) => onEditorStateChange(e, 'section_2_text')}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_2_image", "preview_2")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 667 x 1000 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_2 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_2}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="main_section mt-5">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required  value={contactInfo.email} onChange={(e) => setContactInfo({
                                        ...contactInfo,
                                        email: e.target.value,
                                    })}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required  value={contactInfo.phoneNumber} onChange={(e) => setContactInfo({
                                        ...contactInfo,
                                        phoneNumber: e.target.value,
                                    })}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required value={contactInfo.address} onChange={(e) => setContactInfo({
                                        ...contactInfo,
                                        address: e.target.value,
                                    })}/>
                                </Form.Group>
                            </div>
                            <div className={'main_section'}>
                                <button type={'button'} className="btn my-4" onClick={saveTextHandler} >Save Text</button>

                            </div>
                        </React.Fragment>
                    )
                    : (
                        <div className="text-center">
                            <Spinner animation={"border"}/>
                        </div>
                    )
            }
        </div>
    );
};

export default EditContact;
