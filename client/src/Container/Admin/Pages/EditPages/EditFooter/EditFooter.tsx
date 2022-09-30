import React, {ChangeEvent, useEffect, useState} from 'react';
import {Card, Form, Spinner} from "react-bootstrap";
import ReactQuill from "react-quill";
import {getFooter, updateFooter} from "../../../../../api/cms";
import {errorNotify, successNotify} from "../../../../../utils/toast";
import {formats, modules} from "../../../../../utils/helper";

const EditFooter = () => {

    const [text, setText] = useState<any>("")
    const [preview, setPreview] = useState<any>(null);
    const [image, setImage] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getFooter()
            .then((res) => {
                setText(res.data.text);
                setPreview(res.data.image.avatar)
                setIsLoading(false)
            })
            .catch((e) => {
                errorNotify(e.response.data.message)
                setIsLoading(false)
            })
    }, [])


    const onFormSubmit = async () => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append("text", text);
            formData.append("image", image);
            const res = await updateFooter(formData);
            successNotify(res.data.message)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    return (
        <div className="page_responsive">
            {
                !isLoading ? (
                    <Form>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                value={text || ""}
                                formats={formats}
                                onChange={(value) => setText(value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="file"
                                          required={true}
                                          accept="image/png, image/jpeg"
                                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                              setImage(e.target.files![0])
                                              setPreview(URL.createObjectURL(e.target.files![0]))
                                          }}
                                          placeholder="Select any image"
                            />
                            <div className="edit_product">
                                {
                                    preview ?
                                        (
                                            <div className="mb-3">
                                                <Card>
                                                    <Card.Img
                                                        className="img-fluid"
                                                        variant="top"
                                                        src={preview}
                                                    />
                                                </Card>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </Form.Group>
                        <button type={'button'} className="btn my-4" onClick={onFormSubmit}>Update Text</button>
                    </Form>
                ) : (
                    <div className="text-center">
                        <Spinner animation={"border"}/>
                    </div>
                )
            }

        </div>
    );
};

export default EditFooter;
