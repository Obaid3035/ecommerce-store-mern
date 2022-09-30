import React, {useState} from 'react';
import {Col, Container, Form, Row, Spinner} from 'react-bootstrap'
import "./UploadPhoto.scss";
import {FiUpload} from "react-icons/fi";
import {createPictureApproval} from "../../../../api/admin/pictureApproval";
import {errorNotify, successNotify} from "../../../../utils/toast";

const UploadPhoto = ({section6}: any) => {

    const [files, setFiles] = useState<any>([])
    const [previewImages, setPreviewImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const imageChangeHandler = (e: any) => {
        let uploadedFiles = e.target.files!
        setFiles([...files, ...uploadedFiles]);
        const imagePreview: any = [];
        [...files, ...uploadedFiles!].forEach((img) => {
            imagePreview.push(URL.createObjectURL(img))
        })

        setPreviewImages(imagePreview)

    }

    const onDeleteImageChange = (index: number) => {
        let previewImagesClone = previewImages.concat()
        let uploadedFiles = files.concat()
        previewImagesClone = previewImagesClone.filter((elem, ind) => {
            return index !== ind
        })

        uploadedFiles = uploadedFiles.filter((elem: File, ind: number) => {
            return index !== ind
        })
        setFiles(uploadedFiles)
        setPreviewImages(previewImagesClone)
    }


    const onImageUpload = async (e: React.FormEvent) => {
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

    return (
        <div className={'upload_photo_section'}>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className='add_your_photo' style={{
                            backgroundImage: `url(${section6.image.avatar})`
                        }}>
                            <div className='inner_add_photo'>
                                <div dangerouslySetInnerHTML={{__html: section6.text}}/>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='upload_photo'>
                            <div className='inner_upload_photo'>
                                <div className={'upload_img'}>
                                    <Form onSubmit={onImageUpload}>
                                        <input
                                            type="file"
                                            name="file-input"
                                            onChange={imageChangeHandler}
                                            id="file-input"
                                            accept="image/png, image/jpeg"
                                            required
                                            multiple={true}
                                            className="file_input"/>
                                        <label className="file_label" htmlFor="file-input">
                                            <FiUpload/>
                                            <span>Upload your photo</span>
                                        </label>
                                        {
                                            !isLoading ? (
                                                <button className={'btn mx-2'}>
                                                    SEND
                                                </button>
                                            ) : (
                                                <div className="text-center">
                                                    <Spinner animation={"border"}/>
                                                </div>
                                            )
                                        }
                                    </Form>
                                    {
                                        previewImages.length > 0 ?
                                            previewImages.map((image, index) => (
                                                <img className={"mx-2"} key={index} width={50} height={50}
                                                     alt={"preview"} onClick={() => onDeleteImageChange(index)} src={image}/>
                                            ))
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default UploadPhoto;
