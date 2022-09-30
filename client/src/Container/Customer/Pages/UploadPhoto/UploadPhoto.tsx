import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner,Card } from "react-bootstrap";
import "./UploadPhoto.scss";
import { createPictureApproval } from "../../../../api/admin/pictureApproval";
import {errorNotify, successNotify} from "../../../../utils/toast";
import { IoMdCloseCircleOutline } from 'react-icons/io'

const UploadPhoto = () => {
    const [files, setFiles] = useState<any>([])
    const [previewImages, setPreviewImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
       setIsLoading(true)
        try {
            const formData = new FormData();
            for (const i of files) {
                formData.append('images', i);
            }
            const res = await createPictureApproval(formData)
            successNotify(res.data.message)
            setPreviewImages([])
            setFiles([])
            setIsLoading(false)
        } catch (e: any) {
            setPreviewImages([])
            setFiles([])
            setIsLoading(false)
            errorNotify(e.response.data.message)
        }
    }

    const onDeleteImageChange = (index: number) => {
        let previewImagesClone = previewImages.concat()
        let uploadedFiles = files.concat()
        previewImagesClone = previewImagesClone.filter((_elem, ind) => {
            return index !== ind
        })

        uploadedFiles = uploadedFiles.filter((elem: File, ind: number) => {
            return index !== ind
        })

        setFiles(uploadedFiles)
        setPreviewImages(previewImagesClone)
    }

    const imageChangeHandler = (e: any) => {
        let uploadedFiles = e.target.files!
        setFiles([...files, ...uploadedFiles]);
        const imagePreview: any = [];
        [...files, ...uploadedFiles!].forEach((img) => {
            imagePreview.push(URL.createObjectURL(img))
        })

        setPreviewImages(imagePreview)

    }
    return (
        <div className={'page_responsive'}>
            <h3>Upload Photo on Scrub for Admin Approval</h3>
            <Container>
                <Form onSubmit={onSubmitHandler}>
                    <Row className={'customer_upload_photo'}>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Control type="file"
                                              multiple={true}
                                              required={true}
                                              accept="image/png, image/jpeg"
                                              onChange={imageChangeHandler}
                                />
                            </Form.Group>
                        </Col>

                        <div className="edit_product">
                            {
                                previewImages.length > 0 ?
                                    previewImages.map((imageSrc: any, index:number) => {
                                        return (
                                            <div key={index} className="mb-3">
                                                <Card>
                                            <span>
                                                <IoMdCloseCircleOutline className="cross_icon" onClick={() => onDeleteImageChange(index)}
                                                />
                                            </span>
                                                    <Card.Img
                                                        className="img-fluid"
                                                        alt={"preview"}
                                                        variant="top"
                                                        src={imageSrc}
                                                    />
                                                </Card>
                                            </div>
                                        );
                                    })
                                    : null
                                }
                        </div>

                        <Col md={12}>
                            <div className='text-right'>
                                {isLoading ? <Spinner className='mt-3' animation={'border'} /> :
                                    <Button className='all_btns' type="submit">
                                        Submit
                                    </Button>
                                }
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default UploadPhoto;
