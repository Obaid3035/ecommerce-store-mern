import React, {useEffect, useState} from 'react';
import {Card, Form, Spinner} from "react-bootstrap";
import ReactQuill from "react-quill";
import "./EditAbout.scss"
import {getAboutPage, updateAboutPage} from "../../../../../api/cms";
import {IAbout} from "../../../../../Interfaces";
import {successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";


const AboutEdit = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getAboutPage()
            .then((res: {
                data: IAbout
            }) => {
                setPreviewImages({
                    ...previewImages,
                    preview_1: res.data.section_1.image.avatar,
                    preview_2: res.data.section_2.image.avatar,
                    preview_3: res.data.section_3.image.avatar,
                    preview_4: res.data.section_4.image.avatar,
                    preview_5: res.data.section_5.image.avatar

                })

                setQuillData({
                    ...quillData,
                    section_1_text: res.data.section_1.text,
                    section_2_text: res.data.section_2.text,
                    section_3_text: res.data.section_3.text,
                    section_4_text: res.data.section_4.text,
                    section_5_text: res.data.section_5.text
                })
                setIsLoading(false)
            })
    }, [])

    const [aboutImages, setAboutImages] = useState({
        section_1_image: null,
        section_2_image: null,
        section_3_image: null,
        section_4_image: null,
        section_5_image: null,
    })

    const [previewImages, setPreviewImages] = useState<any>({
        preview_1: null,
        preview_2: null,
        preview_3: null,
        preview_4: null,
        preview_5: null,
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
            formData.append("section_3_text", quillData.section_3_text)
            formData.append("section_4_text", quillData.section_4_text)
            formData.append("section_5_text", quillData.section_5_text)

            if(aboutImages.section_1_image) {
                formData.append("section_1_image", aboutImages.section_1_image)
            }
            if(aboutImages.section_2_image) {
                formData.append("section_2_image", aboutImages.section_2_image)
            }

            if(aboutImages.section_3_image) {
                formData.append("section_3_image", aboutImages.section_3_image)
            }

            if(aboutImages.section_4_image) {
                formData.append("section_4_image", aboutImages.section_4_image)
            }

            if(aboutImages.section_5_image) {
                formData.append("section_5_image", aboutImages.section_5_image)
            }

            const home = await updateAboutPage(formData)
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
                            <h2 className='mb-3'>About Edit Page</h2>


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
                                        <span>*Please choose atleast 667 x 1000 pixels</span>
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
                            <div className={'my-5'}>
                                <h3>Section 3</h3>

                                <div className={'main_section'}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillData.section_3_text}
                                        onChange={(e) => onEditorStateChange(e, 'section_3_text')}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_3_image", "preview_3")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 667 x 1000 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_3 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_3}
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
                                <h3>Section 4</h3>

                                <div className={'main_section'}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillData.section_4_text}
                                        onChange={(e) => onEditorStateChange(e, 'section_4_text')}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_4_image", "preview_4")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 667 x 1000 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_4 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_4}
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
                                <h3>Section 5</h3>

                                <div className={'main_section'}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillData.section_5_text}
                                        onChange={(e) => onEditorStateChange(e, 'section_5_text')}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_5_image", "preview_5")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 667 x 1000 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_5 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_5}
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

export default AboutEdit;
