import React, {useEffect, useState} from 'react';
import {Card, Col, Form, Row, Spinner} from "react-bootstrap";
import ReactQuill from "react-quill";
import "../EditAbout/EditAbout.scss"
import {getHomePage, updateHomePage} from "../../../../../api/cms";
import {IHome} from "../../../../../Interfaces";
import {successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";

const HomeEdit = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [quillData, setQuillData] = useState<any>({})

    useEffect(() => {
        setIsLoading(true)
        getHomePage()
            .then((res: {
                data: IHome
            }) => {
                setPreviewImages({
                    ...previewImages,
                    preview_1_1: res.data.section_1.slider_1.image.avatar,
                    preview_1_2: res.data.section_1.slider_2.image.avatar,
                    preview_1_3: res.data.section_1.slider_3.image.avatar,
                    preview_2: res.data.section_2.image.avatar,
                    preview_3: res.data.section_3.image.avatar,
                    preview_4: res.data.section_4.image.avatar,
                    preview_5: res.data.section_5.image.avatar,
                    preview_6: res.data.section_6.image.avatar,
                    preview_7_1: res.data.section_7.box_1_image.avatar,
                    preview_7_2: res.data.section_7.box_2_image.avatar,
                    preview_7_3: res.data.section_7.box_3_image.avatar

                })

                setQuillData({
                    ...quillData,
                    section_1_1_text: res.data.section_1.slider_1.text,
                    section_1_2_text: res.data.section_1.slider_2.text,
                    section_1_3_text: res.data.section_1.slider_3.text,
                    section_3_text: res.data.section_3.text,
                    section_4_text: res.data.section_4.text,
                    section_5_text: res.data.section_5.text,
                    section_6_text: res.data.section_6.text,
                    section_7_title: res.data.section_7.title,
                })
                setIsLoading(false)
            })
    }, [])

    const [homeImages, setHomeImages] = useState<any>({
        section_1_image_1: null,
        section_1_image_2: null,
        section_1_image_3: null,
        section_2_image: null,
        section_3_image: null,
        section_4_image: null,
        section_5_image: null,
        section_6_image: null,
        section_7_image_1: null,
        section_7_image_2: null,
        section_7_image_3: null,
    })

    const [previewImages, setPreviewImages] = useState<any>({
        preview_1_1: null,
        preview_1_2: null,
        preview_1_3: null,
        preview_2: null,
        preview_3: null,
        preview_4: null,
        preview_5: null,
        preview_6: null,
        preview_7_1: null,
        preview_7_2: null,
        preview_7_3: null,
    } )

    const onChangeHandler = (e: any, img: string, preview: string) => {
        setHomeImages({
            ...homeImages,
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

            for (const property in quillData) {
                formData.append(property, quillData[property])
            }

            for (const property in homeImages) {
                if (homeImages[property]) {
                    formData.append(property, homeImages[property])
                }
            }

            const home = await updateHomePage(formData)
            successNotify(home.data.message)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }


    return (
        <div className="page_responsive">
            {
                !isLoading ? (
                    <React.Fragment>
                        <h2 className='mb-3'>Home Edit Page</h2>

                        <div className={'mb-3'}>
                            <h3>Slider 1</h3>
                            <Row>
                                <Col md={6}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={quillData.section_1_1_text}
                                        formats={formats}
                                        onChange={(e) => onEditorStateChange(e, 'section_1_1_text')}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_1_image_1", "preview_1_1")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 1920 x 993 pixels </span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_1_1 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_1_1}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </div>

                        <div className={'mb-3'}>
                            <h3>Slider 2</h3>
                            <Row>
                                <Col md={6}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={quillData.section_1_2_text}
                                        formats={formats}
                                        onChange={(e) => onEditorStateChange(e, 'section_1_2_text')}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_1_image_2", "preview_1_2")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 1920 x 993 pixels </span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_1_2 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_1_2}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </div>

                        <div className={'mb-3'}>
                            <h3>Slider 3</h3>
                            <Row>
                                <Col md={6}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={quillData.section_1_3_text}
                                        formats={formats}
                                        onChange={(e) => onEditorStateChange(e, 'section_1_3_text')}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_1_image_3", "preview_1_3")}
                                                      placeholder="Select any image"
                                                      multiple={true}
                                        />
                                        <span>*Please choose atleast 1920 x 993 pixels </span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_1_3 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_1_3}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </div>



                        <div className={'mb-3'}>
                            <h3>Section 2</h3>

                            <div className={'main_section'}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="file"
                                                  required={true}
                                                  accept="image/png, image/jpeg"
                                                  onChange={(e) => onChangeHandler(e, "section_2_image", "preview_2")}
                                                  placeholder="Select any image"
                                    />
                                    <span>*Please choose atleast 1920 x 993 pixels </span>
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
                                    value={quillData.section_3_text}
                                    formats={formats}
                                    onChange={(e) => onEditorStateChange(e, 'section_3_text')}
                                />
                                <Form.Group className="mb-3">
                                    <Form.Control type="file"
                                                  required={true}
                                                  accept="image/png, image/jpeg"
                                                  onChange={(e) => onChangeHandler(e, "section_3_image", "preview_3")}
                                                  placeholder="Select any image"
                                    />
                                    <span>*Please choose atleast 667 x 1000 pixels </span>
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
                                    value={quillData.section_4_text}
                                    formats={formats}
                                    onChange={(e) => onEditorStateChange(e, 'section_4_text')}
                                />
                                <Form.Group className="mb-3">
                                    <Form.Control type="file"
                                                  required={true}
                                                  accept="image/png, image/jpeg"
                                                  onChange={(e) => onChangeHandler(e, "section_4_image", "preview_4")}
                                                  placeholder="Select any image"
                                    />
                                    <span>*Please choose atleast 667 x 1000 pixels </span>
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
                                    value={quillData.section_5_text}
                                    formats={formats}
                                    onChange={(e) => onEditorStateChange(e, 'section_5_text')}
                                />
                                <Form.Group className="mb-3">
                                    <Form.Control type="file"
                                                  required={true}
                                                  accept="image/png, image/jpeg"
                                                  onChange={(e) => onChangeHandler(e, "section_5_image", "preview_5")}
                                                  placeholder="Select any image"
                                    />
                                    <span>*Please choose atleast 1920 x 540 pixels </span>
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

                        <div className={'my-5'}>
                            <h3>Section 6</h3>

                            <div className={'main_section'}>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={quillData.section_6_text}
                                    formats={formats}
                                    onChange={(e) => onEditorStateChange(e, 'section_6_text')}
                                />
                                <Form.Group className="mb-3">
                                    <Form.Control type="file"
                                                  required={true}
                                                  accept="image/png, image/jpeg"
                                                  onChange={(e) => onChangeHandler(e, "section_6_image", "preview_6")}
                                                  placeholder="Select any image"
                                    />
                                    <span>*Please choose atleast 1042 x 1043 pixels </span>
                                    <div className="edit_product">
                                        {
                                            previewImages.preview_6 ?
                                                (
                                                    <div className="mb-3">
                                                        <Card>
                                                            <Card.Img
                                                                className="img-fluid"
                                                                variant="top"
                                                                src={previewImages.preview_6}
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
                            <h3>Section 7</h3>

                            <div className={'main_section'}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={quillData.section_7_title}
                                        formats={formats}
                                        onChange={(e) => onEditorStateChange(e, 'section_7_title')}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Box 1</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_7_image_1", "preview_7_1")}
                                                      placeholder="Select any image"
                                        />
                                        <span>*Please choose atleast 897 x 279 pixels </span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_7_1 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_7_1}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Box 2</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_7_image_2", "preview_7_2")}
                                                      placeholder="Select any image"
                                        />
                                        <span>*Please choose atleast 1369 x 1569 pixels </span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_7_2 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_7_2}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Box 3</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="file"
                                                      required={true}
                                                      accept="image/png, image/jpeg"
                                                      onChange={(e) => onChangeHandler(e, "section_7_image_3", "preview_7_3")}
                                                      placeholder="Select any image"
                                        />
                                        <span>*Please choose atleast 1042 x 1043 pixels</span>
                                        <div className="edit_product">
                                            {
                                                previewImages.preview_7_3 ?
                                                    (
                                                        <div className="mb-3">
                                                            <Card>
                                                                <Card.Img
                                                                    className="img-fluid"
                                                                    variant="top"
                                                                    src={previewImages.preview_7_3}
                                                                />
                                                            </Card>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                </Form.Group>
                            </div>
                        </div>

                        <div className={'main_section'}>
                            <button type={'button'} className="btn my-4" onClick={saveTextHandler} >Save Text</button>

                        </div>
                    </React.Fragment>
                ) : (
                    <div className="text-center">
                        <Spinner animation={"border"}/>
                    </div>
                )
            }
        </div>
    );
};

export default HomeEdit;
