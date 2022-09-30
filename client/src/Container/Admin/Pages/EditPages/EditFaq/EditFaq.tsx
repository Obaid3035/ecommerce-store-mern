import React, {useEffect, useState} from 'react';
import {Card, Col, Form, Row, Spinner, Breadcrumb} from "react-bootstrap";
import ReactQuill from "react-quill";
import { ImCross } from "react-icons/im"
import "../EditAbout/EditAbout.scss"
import {
    getFaq,
    updateFaq,
} from "../../../../../api/cms";
import { IFaq } from "../../../../../Interfaces";
import {successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";


const EditFaq= () => {


    const [isLoading, setIsLoading] = useState(false);
    const [faqInput, setFaqInput] = useState({
        question: "",
        answer: ""
    })
    const [queries, setQueries] = useState<any>([]);

    useEffect(() => {
        setIsLoading(true)
        getFaq()
            .then((res: {
                data: IFaq
            }) => {
                setPreviewImages({
                    ...previewImages,
                    preview_1: res.data.section_1.image.avatar,
                })

                setQueries(res.data.section_2.queries)

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
    })

    const [previewImages, setPreviewImages] = useState<any>({
        preview_1: null,
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
            formData.append("queries", JSON.stringify(queries))

            if(aboutImages.section_1_image) {
                formData.append("image", aboutImages.section_1_image)
            }

            const home = await updateFaq(formData)
            successNotify(home.data.message)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }



    const onAddQueryHandler = (e: any) => {
        e.preventDefault();
        const queriesClone = queries.concat()
        queriesClone.push({
            question: faqInput.question,
            answer: faqInput.answer
        })
        setQueries(queriesClone)
        setFaqInput({
            question: "",
            answer: ""
        })
    }


    const onRemoveQueryHandler = (selectedIndex: number) => {
        const queriesClone: [] = queries.concat()

        queriesClone.splice(selectedIndex, 1 )
        setQueries(queriesClone)
    }


    return (
        <div className="page_responsive">
            {
                !isLoading ?
                    (
                        <React.Fragment>
                            <h2 className='mb-3'>Faq Edit Page</h2>


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




                                <Row>
                                    <Col md={6}>
                                        <Form onSubmit={onAddQueryHandler}>
                                            <Form.Group>
                                                <Form.Label>Question</Form.Label>
                                                <Form.Control type="text" name={"question"} value={faqInput.question} required onChange={(e) => {
                                                    setFaqInput({
                                                        ...faqInput,
                                                        question: e.target.value,
                                                    })
                                                }}/>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Answer</Form.Label>
                                                <Form.Control type="text" name={"answer"} value={faqInput.answer} onChange={(e) => {
                                                    setFaqInput({
                                                        ...faqInput,
                                                        answer: e.target.value,
                                                    })
                                                }}/>
                                            </Form.Group>

                                            <button className="btn my-3">Add</button>

                                            {
                                                queries.map((query: any, index: number) => (
                                                    <div className={"d-flex align-items-center"}>
                                                        <p className={"my-0"}>{index + 1}- Question: <span className={"text-muted"}>{ query.question }</span></p>
                                                        <p className={"my-0 mx-3"}>Answer: <span className={"text-muted"}>{ query.answer }</span></p>
                                                        <ImCross onClick={() => onRemoveQueryHandler(index)}/>
                                                    </div>
                                                ))
                                            }


                                        </Form>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Text</Form.Label>
                                            <ReactQuill
                                                theme="snow"
                                                modules={modules}
                                                formats={formats}
                                                value={quillData.section_2_text}
                                                onChange={(e) => onEditorStateChange(e, 'section_2_text')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className={'main_section'}>
                                <button type={'button'} className="btn my-2" onClick={saveTextHandler} >Save Text</button>
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

export default EditFaq;
