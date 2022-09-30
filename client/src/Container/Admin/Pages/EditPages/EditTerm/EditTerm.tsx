import React, {useEffect, useState} from 'react';
import {Card, Form, Spinner} from "react-bootstrap";
import ReactQuill from "react-quill";
import "../EditAbout/EditAbout.scss"
import {getAboutPage, getContact, getTerm, updateAboutPage, updateContact, updateTerm} from "../../../../../api/cms";
import {IAbout} from "../../../../../Interfaces";
import {successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";


const EditTerm = () => {


    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getTerm()
            .then((res: {
                data: IAbout
            }) => {
                setPreviewImages({
                    ...previewImages,
                    preview_1: res.data.section_1.image.avatar,
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

            if(aboutImages.section_1_image) {
                formData.append("image", aboutImages.section_1_image)
            }

            const home = await updateTerm(formData)
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
                            <h2 className='mb-3'>Term Edit Page</h2>


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

export default EditTerm;
