import React, { useState, useEffect } from "react";
import {Container, Col, Row, Form, Button, Spinner, Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import Select from 'react-select';
import './CreateProduct.scss';
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import { IProduct } from '../../../../../Interfaces'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { createProduct } from "../../../../../api/admin/product";
import { getColorOptions } from "../../../../../api/admin/color";
import { getAttributesOptions } from "../../../../../api/admin/attribute";
import {getCategoryByParentOption, getSubCategoryOptions} from "../../../../../api/admin/category";
import { AiOutlinePlus } from 'react-icons/ai'
import {getParentCategoryOptions} from "../../../../../api/admin/parentCategory";
import { AiFillEdit } from "react-icons/ai"
import {FormGroup} from "@mui/material";

interface IInventory {
    color: string,
    size: string,
    quantity: string
    colorName: string
}

export interface ISelect {
    value: string,
    label: string
}

const ColorSizeData = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
]

const CreateProduct = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IProduct>();
    const [disableInput, setDisableInput] = useState(false)
    const [inventory, setInventory] = useState<IInventory[]>([])
    const [productColor, setProductColor] = useState<ISelect | null>(null);
    const [productSize, setProductSize] = useState<ISelect | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [productQuantity, setProductQuantity] = useState<string>("0");
    const [colorOption, setColorOption] = useState([])
    const [attributeOption, setAttributeOption] = useState([])
    const [productImages, setProductImages] = useState<any>([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [categoryOption, setCategoryOption] = useState([])
    const [parentCategory, setParentCategory] = useState<any>(null)
    const [subCategory, setSubCategory] = useState<any>([])

    const [productTypeOption, setProductTypeOption] = useState<any[]>([])
    const [prices, setPrices] = useState<any>({
        price: 0,
        discount: 0
    })

    useEffect(() => {

        async function fetchMyAPI() {
            const colorsPromise = getColorOptions()
            const attributesPromise = getAttributesOptions()
            const productTypePromise = getParentCategoryOptions()
            const [colors, attributes, productType] = await Promise.all([colorsPromise, attributesPromise, productTypePromise])
            setColorOption(colors.data)
            setAttributeOption(attributes.data)

            setProductTypeOption(productType.data)
        }
        fetchMyAPI()
    }, [])


    useEffect(() => {
      if (inventory.length > 0) {
          setDisableInput(true)
      } else {
          setDisableInput(false)
      }
    }, [inventory])

    const onSubmitHandler = handleSubmit((data) => {
        if (!data.attribute || !parentCategory || subCategory.length <= 0 || !data.weight.unit) {
            errorNotify("Please Select All fields")
        } else if (inventory.length <= 0) {
            errorNotify("Please Add At Least one inventory")
        }   else {
            setIsLoading(true)
            const allData: any = {
                ...data,
                attribute: (data.attribute as any).map((val: any) => {
                    return val.value
                }),
                subCategory: subCategory.map((val: any) => {
                    return val.value
                }),
                parentCategory: parentCategory && parentCategory.value,
                inventory,
                images: productImages
            }

            const formData = new FormData();
            formData.append("name", allData.name);
            for (const i of allData.images) {
                formData.append('images', i);
            }
            formData.append("description", allData.description);
            formData.append("price", allData.price);
            if (!allData.discountPrice) {
                formData.append("discountPrice", "0");
            } else{
                formData.append("discountPrice", allData.discountPrice);
            }

            formData.append("parentCategory", allData.parentCategory);
            formData.append("images", allData.images)
            formData.append("inventory", JSON.stringify(allData.inventory));
            formData.append("attribute", JSON.stringify(allData.attribute));
            formData.append("subCategory", JSON.stringify(allData.subCategory));
            formData.append("weight", JSON.stringify({
                unit: allData.weight.unit.value,
                value: allData.weight.value
            }));
            createProduct(formData)
                .then((res) => {
                    setIsLoading(false)
                    successNotify(res.data.message);
                    navigate('/admin/products')
                    reset()
                })
        }

    })

    const addColors = () => {
        if(parseInt(productQuantity) <= 0) {
            errorNotify("product quantity must be positive number")
            return;
        }
        if (!inventory || !productColor || !productSize || productQuantity === '') {
            errorNotify("Please Select All fields")
            return;
        }

        else {
            const inventoryClone = inventory.concat();

            inventoryClone.push({
                color: productColor.value,
                colorName: productColor.label,
                size: productSize.value,
                quantity: productQuantity
            })

            setInventory(inventoryClone)
            setProductColor(null)
            setProductSize(null)
            setProductQuantity("0")
        }
    }

    const onDeleteItemHandler = (index:number) =>{
        const updatedItems = inventory.filter((elem,ind)=>{
            return index !== ind
        })
        setInventory(updatedItems)
    }

    const onUpdateItemHandler = (invent: IInventory, index: number) => {

        setProductColor({
            value: invent.color,
            label: invent.colorName
        })

        setProductSize({
            value: invent.size,
            label: invent.size
        })

        setProductQuantity(invent.quantity)

        const updatedItems = inventory.filter((elem,ind)=>{
            return index !== ind
        })
        setInventory(updatedItems)
    }


    const imageChangeHandler = (e: any) => {
        let uploadedFiles = e.target.files!
        setProductImages([...productImages, ...uploadedFiles]);
        const imagePreview: any = [];
        [...productImages, ...uploadedFiles!].forEach((img) => {
            imagePreview.push(URL.createObjectURL(img))
        })
        setPreviewImages(imagePreview)
    }


    const onDeleteImageChange = (index: number) => {
        let previewImagesClone = previewImages.concat()
        let productImageClones = productImages.concat()
        productImageClones = productImageClones.filter((elem: any, ind: number) => {
            return index !== ind
        })
        previewImagesClone = previewImagesClone.filter((elem, ind) => {
            return index !== ind
        })
        setProductImages(productImageClones)
        setPreviewImages(previewImagesClone)
    }

    const weightOption = [{
        label: "KG",
        value: "kg"
    }, {
        label: "LB",
        value: "lb"
    }]

    let data = (
        <div className="text-center">
            <Spinner animation={"border"}/>
        </div>
    )

    const onParentCategoryChangeHandler = (category: any) => {
        getCategoryByParentOption(category.value)
            .then((res) => {
                setParentCategory(category)
                setCategoryOption(res.data)
            })
    }

    if (!isLoading) {
        data = (
            <Col md={8} className="Products_container">
                <Form onSubmit={onSubmitHandler}>
                    <div className="mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Products Name</Form.Label>
                            <Form.Control disabled={disableInput} type="text"  {...register('name', inputValidation.productName)} placeholder="Enter Products Name" />
                            <small className="text-danger"> {errors.name && errors.name.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Products Description</Form.Label>
                            <Form.Control disabled={disableInput} type="text" {...register('description', inputValidation.productDescription)} placeholder="Enter Products Description" />
                            <small className="text-danger"> {errors.description && errors.description.message} </small>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Select Parent Category</Form.Label>
                            <Select
                             onChange={onParentCategoryChangeHandler}
                                options={productTypeOption}
                             value={parentCategory}
                                className="basic-multi-select mb-3"
                                classNamePrefix="select"
                                placeholder="Select Parent Category"
                            />
                        </Form.Group>
                        {
                            parentCategory ? (
                                <Form.Group>
                                    <Form.Label>Select Sub Category</Form.Label>
                                    <Select
                                        onChange={(selected) => setSubCategory(selected)}
                                        value={subCategory}
                                        isMulti
                                        options={categoryOption}
                                        className="basic-multi-select mb-3"
                                        classNamePrefix="select"
                                        placeholder="Select SubCategory"
                                    />
                                </Form.Group>
                            ) : null
                        }
                        <Form.Label>Select Attribute</Form.Label>
                        <Controller
                            name="attribute"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={attributeOption}
                                        className="basic-multi-select mb-3"
                                        classNamePrefix="select"
                                        placeholder="Select Attribute"
                                    />
                                );
                            }}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Choose Multiple Products Images</Form.Label>
                            <Form.Control type="file"
                                          required={true}
                                          disabled={disableInput}
                                          accept="image/png, image/jpeg"
                                          onChange={imageChangeHandler}
                                          placeholder="Select any image"
                                          multiple={true}
                            />
                            <small className="text-danger"> {errors.images && errors.images.message} </small>
                        </Form.Group>

                        <div className="edit_product">
                            {previewImages.map((imageSrc, index) => {
                                return (
                                    <div key={index} className="mb-3">
                                        <Card>
                                                            <span>
                                                                <IoMdCloseCircleOutline className="cross_icon" onClick={() => onDeleteImageChange(index)}
                                                                />
                                                            </span>
                                            <Card.Img
                                                className="img-fluid"
                                                variant="top"
                                                src={imageSrc}
                                            />
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>


                        <Form.Group className="mb-3">
                            <Form.Label>Products Price</Form.Label>
                            <Form.Control disabled={disableInput} type="number" step="0.01" min="1"  {...register('price', inputValidation.productPrice)} placeholder="Enter product price"
                                          onChange={(e) => setPrices({
                                              ...prices,
                                              price: e.target.value
                                          })} />
                            <small className="text-danger"> {errors.price && errors.price.message} </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Products Discounted Percentage</Form.Label>
                            <Form.Control disabled={parseInt(prices.price) <= 0 || prices.price.length === 0 || disableInput} type="number" min="0" {...register('discountPrice')} placeholder="Enter Discounted Percentage" />
                            <small className="text-danger"> {errors.discountPrice && errors.discountPrice.message} </small>
                        </Form.Group>

                        <FormGroup className="mb-3">
                            <Form.Label>Products Weight</Form.Label>
                            <Form.Control disabled={disableInput} required type="number" step="0.01" min="1"  {...register('weight.value', inputValidation.weight.value)} placeholder="Enter Weight" />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>Products Weight Unit</Form.Label>
                            <Controller
                                name="weight.unit"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            { ...field }
                                            // @ts-ignore
                                            options={weightOption}
                                            className="basic-multi-select mb-3"
                                            classNamePrefix="select"
                                            placeholder="Select Type"
                                        />
                                    );
                                }}
                            />
                        </FormGroup>
                        <Form.Label>Products Inventory</Form.Label><br/>
                        <Form.Label>Products Inventory Color</Form.Label>
                        <Select
                            onChange={setProductColor}
                            options={colorOption}
                            value={productColor}
                            className="basic-multi-select mb-3"
                            classNamePrefix="select"
                            placeholder="Select Colors"
                        />
                        <Form.Label>Products Inventory Size</Form.Label>
                        <Select
                            onChange={setProductSize}
                            options={ColorSizeData}
                            value={productSize}
                            className="basic-multi-select mb-3"
                            classNamePrefix="select"
                            placeholder="Select Color Size"
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Products Inventory Quantity</Form.Label>
                            <Form.Control type="number"
                                          min="0"
                                          value={productQuantity}
                                          onChange={ (e) => setProductQuantity(e.target.value)} placeholder="Enter product color quantity" />
                        </Form.Group>

                        {inventory.length > 0 ?
                            <React.Fragment>
                                {inventory?.map((inventory,index) => {
                                    return (
                                        <Row>
                                            <Col md={3}>
                                                <p>{inventory.colorName} </p>
                                            </Col>
                                            <Col md={3}>
                                                <p>{inventory.size}</p>
                                            </Col>
                                            <Col md={3}>
                                                <p>{inventory.quantity}</p>
                                            </Col>
                                            <Col md={3}>
                                                <div className='icon_container'>
                                                    <span><IoMdCloseCircleOutline className='cross_icon mx-2' onClick={()=> onDeleteItemHandler(index)} /></span>
                                                    <span><AiFillEdit className='cross_icon mx-2' onClick={()=> onUpdateItemHandler(inventory, index)} /></span>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })}

                            </React.Fragment>
                            : null
                        }

                    </div>
                    <div className='add_view_container'>
                        <Button className='all_btns mb-3' type="submit">Create Products</Button>
                        <Button className='all_btns mb-3' onClick={addColors}><AiOutlinePlus className="plus_icon" /></Button>
                    </div>
                </Form>
            </Col>
        )
    }


    return (
      <div className="page_responsive">
          <h3>Create Products</h3>
          <div className={'create_product_btn'}>
              <Button onClick={() => navigate('/admin/products')}>Back</Button>
          </div>
          <Container>
              <Row>
                  { data }
              </Row>
          </Container>
      </div>
    )
}
export default CreateProduct
