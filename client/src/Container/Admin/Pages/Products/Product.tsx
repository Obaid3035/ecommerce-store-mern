import React, {useEffect, useState} from "react";
import "./Product.scss";
import {useNavigate} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";
import DeleteModal from "../../../../Component/DeleteModal/DeleteModal";
import ProductDetails from './ProductDetails/ProductDetails'
import {successNotify} from "../../../../utils/toast";
import {deleteProduct, getProduct, getProductById} from "../../../../api/admin/product";

const Products = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [productDetailShow, setProductDetailsShow] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [id, setId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");

    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getProduct(page, searchText)
            .then((res) => {
                setData(res.data)
                setIsLoading(false);
            })
    }, [page, !isFetching, searchText])

    const onDeleteHandler = (productId: string) => {
        setIsLoading(true)
        setIsFetching(true)
        setShow(!show)
        deleteProduct(productId)
            .then((res) => {
                successNotify(res.data.message)
                setIsFetching(false)
                setIsLoading(false)
            })
    }

    const onViewHandler = (productId: string) => {
        setViewLoading(true)
        getProductById(productId)
            .then((res) => {
                setProduct(res.data)
                setViewLoading(false)
            })
        setProductDetailsShow(true)
    }

    let columns = [
        {
            name: "ID",
            options: {
                display: false,
            },
        },
        'Products ID',
        'Products Name',
        'Products Price',
        {
            name: "Actions",
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <div className={"d-flex"}>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/edit-product/${tableMeta.rowData[0]}`)}>
                                Edit
                            </button>
                            <button className={'btn mx-2'} onClick={() => deleteProductHandler(tableMeta.rowData[0])}>
                                Delete
                            </button>
                            <button className={'btn'} onClick={() => onViewHandler(tableMeta.rowData[0])}>
                                View
                            </button>
                        </div>
                    )
                }
            },
        },
    ]

    const deleteProductHandler = (productId: string) => {
        setShow(!show)
        setId(productId)
    }

    return (
        <div className={'page_responsive'}>
            <React.Fragment>
                <DeleteModal show={show} onClose={() => setShow(!show)} onSubmit={() => onDeleteHandler(id!)}/>
                <h3> Products </h3>

                <div className={'create_product_btn'}>
                    <Button className="all_btns" onClick={() => navigate('/admin/create-product')}>Create Product</Button>
                </div>
                <MuiDataTable data={data} isLoading={isLoading} search={true} setSearchText={setSearchText}
                              columns={columns} page={page} setPage={setPage}/>

                {
                    !viewLoading ?
                        <ProductDetails isLoading={viewLoading} product={product} show={productDetailShow}
                                        handleClose={() => setProductDetailsShow(false)}/>
                        : null
                }
            </React.Fragment>
        </div>
    );
};

export default Products;
