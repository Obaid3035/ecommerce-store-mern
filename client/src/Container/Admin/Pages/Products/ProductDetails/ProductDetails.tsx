import React, { useState } from 'react';
import { Container, Col, Row, Spinner, Table } from "react-bootstrap";
import ProductDetailsModal from "../../../../../Component/SiteModal/SiteModal"
import ImageGallery from 'react-image-gallery';

interface IDetailsModal {
    show: boolean,
    handleClose: () => void,
    product: any,
    isLoading: boolean
}

const ProductDetails: React.FC<IDetailsModal> = ({ show, handleClose, product, isLoading }) => {


    const mapArray = (resource: any[]) => {
        if (resource.length > 0) {
            return resource.map((resource) => {
                return `${resource.name} `
            })
        }
        return "Empty"
    }
    return (
      <ProductDetailsModal size={"lg"} show={show} modalTitle={"Products Details"} handleClose={handleClose}>
          <Container>
              <Row>
                  {
                      !isLoading && product ? (
                        <React.Fragment>
                            <Col md={6} className="d-flex justify-content-center w-100">
                                {
                                    product.images.length > 0 ? (
                                      <ImageGallery showFullscreenButton={false}  items={
                                          product.images.map((img: any) => {
                                              return {
                                                  original: img.avatar
                                              }
                                          })
                                      } />
                                    ) : (
                                      <div className={"text-center"}>
                                          <Spinner animation={"border"}/>
                                      </div>
                                    )
                                }
                            </Col>

                            <Col md={12}>
                                <div className='details_container'>
                                    <Row>
                                        <Col md={6}>
                                            <p><b>Product Name:</b> { product.name }</p>
                                        </Col>

                                        <Col md={6}>
                                            <p><b>Category:</b> {mapArray(product.subCategory)} </p>
                                        </Col>
                                        <Col md={6}>
                                            <p><b>Attribute:</b> {mapArray(product.attribute)} </p>
                                        </Col>

                                        <Col md={6}>
                                            <p><b>Product Price:</b> ${product.price}</p>
                                        </Col>

                                        <Col md={6}>
                                            <p><b>Discounted Price:</b> ${product.discountPrice}</p>
                                        </Col>
                                        <Col md={12}>
                                            <p><b>Product Description: </b> {product.description}</p>
                                        </Col>

                                        <Col md={12} className={"text-center"}>
                                            <Table>
                                                <tr>
                                                    <th> Color </th>
                                                    <th> Size </th>
                                                    <th> Quantity </th>
                                                </tr>
                                                {
                                                    product.inventory.length > 0 ?
                                                      product.inventory.map((inventory: any) => (
                                                        <tr>
                                                            <td>{inventory.color.name}</td>
                                                            <td>{inventory.size}</td>
                                                            <td>{inventory.quantity}</td>
                                                        </tr>
                                                      ))
                                                      : null
                                                }
                                            </Table>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </React.Fragment>
                      ) : (
                        <div className={"text-center"}>
                            <Spinner animation={"border"}/>
                        </div>
                      )
                  }
              </Row>
          </Container>
      </ProductDetailsModal>
    )
}

export default ProductDetails
