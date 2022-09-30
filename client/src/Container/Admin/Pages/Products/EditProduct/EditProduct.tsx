import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "../CreateProduct/CreateProduct.scss";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from "../../../../../lib/Validation";
import { IProduct } from "../../../../../Interfaces";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./EditProduct.scss";
import {
  deleteImage,
  getProductById,
  updateProduct,
  uploadImages,
} from "../../../../../api/admin/product";
import { getColorOptions } from "../../../../../api/admin/color";
import { getAttributesOptions } from "../../../../../api/admin/attribute";
import {getCategoryByParentOption} from "../../../../../api/admin/category";
import {AiFillEdit, AiOutlinePlus} from "react-icons/ai";
import {getParentCategoryOptions} from "../../../../../api/admin/parentCategory";
import {FormGroup} from "@mui/material";

interface IInventory {
  color: string;
  colorName: string;
  size: string;

  quantity: number;
}

const EditProduct = () => {
  const ColorSizeData = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
  ]
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState<IInventory[]>([]);
  const [productColor, setProductColor] = useState<any>([]);
  const [productColorSize, setProductColorSize] = useState<any>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [productColorquantity, setProductColorQuantity] = useState<any>("1");
  const [parentCategory, setParentCategory] = useState<any>(null)
  const [subCategory, setSubCategory] = useState<any>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<IProduct>();
  const [images, setImages] = useState<any>([]);
  const [colorOption, setColorOption] = useState([]);
  const [attributeOption, setAttributeOption] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [productTypeOption, setProductTypeOption] = useState<any>([])

  const [isFetching, setIsFetching] = useState(false);
  const [prices, setPrices] = useState<any>({
    price: 0,
    discount: 0
  })

  const weightOption = [{
    label: "KG",
    value: "kg"
  }, {
    label: "LB",
    value: "lb"
  }]

  useEffect(() => {
    getColorOptions().then((res) => {
      setColorOption(res.data);
    });
    getAttributesOptions().then((res) => {
      setAttributeOption(res.data);
    });

    getParentCategoryOptions()
        .then((productTypeRes) => {
          setProductTypeOption(productTypeRes.data)
        })
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getProductById(id!).then((res) => {
      setProduct(res.data);
      const inventory = res.data.inventory.map((inventory: any) => {
        return {
          colorName: inventory.color.name,
          color: inventory.color._id,
          size: inventory.size,
          quantity: inventory.quantity,
        };
      });
      setInventory(inventory);
      setValue("name", res.data.name);
      setPrices({
        price: res.data.price,
        discount: res.data.discountPrice
      })
      setValue("description", res.data.description);
      setValue("price", res.data.price);
      setParentCategory({
        value: res.data.parentCategory._id,
        label: res.data.parentCategory.name,
      })
      getCategoryByParentOption(res.data.parentCategory._id).then((res) => {
        setCategoryOption(res.data);
      });
      setValue("weight.value", res.data.weight.value);
      setValue("weight.unit", weightOption.find(unit => unit.value == res.data.weight.unit)!);
      setValue("discountPrice", res.data.discountPrice);
      setSubCategory(res.data.subCategory.map((category: any) => {
        return {
          value: category._id,
          label: category.name,
        };
      }))
      setValue(
        "attribute",
        res.data.attribute.map((attribute: any) => {
          return {
            value: attribute._id,
            label: attribute.name,
          };
        })
      );
      setIsLoading(false);
    });
  }, [!isFetching]);

  const onSubmitHandler = handleSubmit((data) => {
    if (!data.attribute || !parentCategory || subCategory <= 0) {
      errorNotify("Please Select All fields");
    } else if (inventory.length <= 0) {
      errorNotify("Please Add atleast one inventory")
    }  else {
      setFormLoading(true);
      const allData: any = {
        ...data,
        attribute: (data.attribute as any).map((val: any) => {
          return val.value;
        }),
        subCategory: subCategory.map((val: any) => {
          return val.value
        }),
        parentCategory: parentCategory && parentCategory.value,
        weight: {
          value: data.weight.value,
          unit: data.weight.unit.value
        },
        inventory,
      };

      updateProduct(allData, id!).then((res) => {
        successNotify(res.data.message);
        setFormLoading(false);
        navigate("/admin/products");
        reset();
      });
    }
  });

  const addColors = () => {
    if(parseInt(productColorquantity) <= 0) {
      errorNotify("product quantity must be positive number")
      return;
    }

    if ( !productColor || !productColorSize || productColorquantity === '') {
      errorNotify("Please Select All fields")
      return;
    }

      const inventoryClone = inventory.concat();
      inventoryClone.push({
        colorName: productColor.label,
        color: productColor.value,
        size: productColorSize.value,
        quantity: productColorquantity,
      });

      setInventory(inventoryClone);

    setProductColor(null)
    setProductColorSize(null)
    setProductColorQuantity("0")

  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files!);
  };

  const formUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsFetching(true)
    const formData = new FormData();
    for (const i of images) {
      formData.append("images", i);
    }
    uploadImages(id!, formData).then((res) => {
      setIsLoading(false);
      setIsFetching(false)
      successNotify(res.data.message);
    });
  };

  const deleteImageHandler = (img: any) => {
    setIsLoading(true);
    setIsFetching(true)
    deleteImage(id!, img)
      .then((res) => {
        setIsLoading(false);
        setIsFetching(false)
        successNotify(res.data.message);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsFetching(false)
        errorNotify(err.response.data.message);
      });
  };

  const DeleteItem = (index: number) => {
    const updatedItems = inventory.filter((elem, ind) => {
      return index !== ind;
    });
    setInventory(updatedItems);
  };

  const onUpdateItemHandler = (invent: IInventory, index: number) => {
    setProductColor({
      value: invent.color,
      label: invent.colorName
    })

    setProductColorSize({
      value: invent.size,
      label: invent.size
    })

    setProductColorQuantity(invent.quantity)

    const updatedItems = inventory.filter((elem,ind)=>{
      return index !== ind
    })
    setInventory(updatedItems)
  }

  const onParentCategoryChangeHandler = (category: any) => {
    setSubCategory([])
    getCategoryByParentOption(category.value)
        .then((res) => {
          setParentCategory(category)
          setCategoryOption(res.data)
        })
  }


  return (
    <div className="page_responsive">
      <h3>Update Products</h3>
      <div className={"create_product_btn"}>
        <Button onClick={() => navigate("/admin/products")}>Back</Button>
      </div>
      <Container>
        <Row>
          {!isLoading && product ? (
            <Col md={8} className="Products_container">

              <div className="edit_product">
                {product.images.map((data: any) => {
                  return (
                      <div key={data.id} className="mb-3">
                        <Card>
                        <span>
                          <IoMdCloseCircleOutline
                              onClick={() => deleteImageHandler(data)}
                          />
                        </span>
                          <Card.Img
                              className="img-fluid"
                              variant="top"
                              src={data.avatar}
                          />
                        </Card>
                      </div>
                  );
                })}
              </div>

              <Form onSubmit={formUpload}>
                <Form.Group className="mb-3">
                  <Form.Label>Choose Multiple Products Images</Form.Label>
                  <Form.Control
                      type="file"
                      multiple
                      required
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      placeholder="Select any image"
                  />
                  <div className="d-flex justify-content-end p-3">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form.Group>
              </Form>

              <Form onSubmit={onSubmitHandler}>
                <div className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Products Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", inputValidation.name)}
                      placeholder="Enter Products Name"
                    />
                    <small className="text-danger">
                      {" "}
                      {errors.name && errors.name.message}{" "}
                    </small>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Products Description</Form.Label>
                    <Form.Control
                      type="text"
                      {...register(
                        "description",
                        inputValidation.productDescription
                      )}
                      placeholder="Enter Products Description"
                    />
                    <small className="text-danger">
                      {errors.description && errors.description.message}{" "}
                    </small>
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
                    <Form.Label>Products Price</Form.Label>
                    <Form.Control
                      type="text"
                      step="0.01" min="1"
                      {...register("price", inputValidation.productPrice)}
                      placeholder="Enter product price"
                      onChange={(e) => setPrices({
                        ...prices,
                        price: e.target.value
                      })}
                    />
                    <small className="text-danger">
                      {errors.price && errors.price.message}{" "}
                    </small>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Products Discounted Price</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={parseInt(prices.price) <= 0 || prices.price.length === 0}
                      {...register(
                        "discountPrice",
                        inputValidation.discountedPrice
                      )}
                      placeholder="Enter discounted price"
                    />
                    <small className="text-danger">
                      {errors.discountPrice &&
                        errors.discountPrice.message}
                    </small>
                  </Form.Group>


                  <FormGroup className="mb-3">
                    <Form.Label>Products Weight</Form.Label>
                    <Form.Control required type="number" step="0.01" min="1" {...register('weight.value', inputValidation.weight.value)} placeholder="Enter Weight" />
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
                    onChange={setProductColorSize}
                    options={ColorSizeData}
                    value={productColorSize}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    placeholder="Select Color Size"
                  />
                  <Form.Group className="mb-3">
                    <Form.Label>Products Inventory Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={productColorquantity}
                      onChange={ (e) => setProductColorQuantity(e.target.value)}
                      placeholder="Enter product color quantity" />
                  </Form.Group>

                  {inventory.length > 0 ? (
                    <React.Fragment>
                      {inventory?.map(
                          (inventory, index) => {
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
                                    <div className="icon_container">
                                  <span>
                                    <IoMdCloseCircleOutline
                                        className="cross_icon mx-2"
                                        onClick={() => DeleteItem(index)}
                                    />
                                  </span>
                                      <span><AiFillEdit className='cross_icon mx-2' onClick={()=> onUpdateItemHandler(inventory, index)} /></span>

                                    </div>
                                  </Col>
                                </Row>
                            );
                          }
                      )}
                    </React.Fragment>
                  ) : null}
                </div>

                <div className="add_view_container">
                  {!formLoading ? (
                    <React.Fragment>
                      <Button className="all_btns mb-3" type="submit">
                        Update Products
                      </Button>
                      <Button className="all_btns mb-3" onClick={addColors}>
                        <AiOutlinePlus className="plus_icon" />
                      </Button>
                    </React.Fragment>
                  ) : (
                    <div className="text-center">
                      <Spinner animation={"border"} />
                    </div>
                  )}
                </div>
              </Form>
            </Col>
          ) : (
            <div className={"text-center"}>
              <Spinner animation={"border"} />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default EditProduct;
