import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Spinner} from 'react-bootstrap'
import Products from './Products/Products'
import ProductFilter from './ProductFilter/ProductFilter'
import {AiOutlineHome} from 'react-icons/ai'
import './Shop.scss'
import Banner from "../../../Component/Banner/Banner";
import {getAllCategories, getAllColors, getAllProducts} from "../../../api/product";
import {useQuery} from "../../../utils/helper";
import {useNavigate, useSearchParams} from "react-router-dom";
import Loader from "../../../Component/Loader/Loader";

export interface ICategory {
    _id: string,
    name: string
}

const Shop = () => {
    const query  = useQuery()
    let [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [page,setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [category, setCategory] = useState<ICategory[]>([]);
    const [productCount, setProductCount] = useState(0)
    const [color, setColor] = useState([])
    const [searchTerm, setSearchTerm] = useState<any>(null)
    const navigation = useNavigate();

    useEffect(() => {
        if (query.get("subCategory")) {
            setSelectedCategory([
                ...selectedCategory,
                query.get("subCategory")!
            ])
        }
    }, []);


    useEffect(() => {
        setSearchLoader(true)

        const search = searchParams.get("search");
        setSearchTerm(search)
        getAllProducts({
            subCategory: selectedCategory,
            size: selectedSize,
            color: selectedColor,
            parentCategory: query.get("parentCategory"),
            search: search
        }, page)
            .then((res) => {
                setProducts(res.data.data)
                setSearchLoader(false)
                setProductCount(res.data.count)
            })
    }, [selectedColor, selectedCategory, selectedSize, page])


    useEffect(() => {

        setIsLoading(true)
        async function fetchMyAPI() {
            let categoriesPromise = getAllCategories()
            let colorsPromise = getAllColors()
            const [categories, colors] = await Promise.all([categoriesPromise, colorsPromise,])
            setCategory(categories.data.map((data: any) => {
                if (query.get("subCategory") && query.get("subCategory") == data._id) {
                    return {
                        ...data,
                        isChecked: true
                    }
                }
                return {
                    ...data,
                    isChecked: false
                }
            }))
            setColor(colors.data)
            setIsLoading(false)
        }

        fetchMyAPI()
    }, [])

    return (
        <React.Fragment>
            <Banner heading={'SHOP'} cssClass={'shop_main'}/>
            <Container>
                <span className='home'>
                    <AiOutlineHome className='home_icon' onClick={() => navigation("/")}/>
                    / All Products</span>
                {
                    !isLoading ?
                        <Row>
                            <Col md={3}>
                                <ProductFilter
                                    color={color}
                                    category={category}
                                    setCategory={setCategory}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    setSelectedColor={setSelectedColor}
                                    selectedColor={selectedColor}
                                />
                            </Col>
                            <Col md={9}>
                                {
                                    searchTerm ? <p className={"text-center"}>You have search {searchTerm}</p>  : null
                                }
                                {
                                    !searchLoader ? (
                                        <Products productCount={productCount} products={products} page={page} setPage={setPage}/>
                                    ) : (
                                        <div className={"text-center"}>
                                            <Spinner animation={"border"}/>
                                        </div>
                                    )
                                }
                            </Col>

                        </Row>
                        : <Loader cms={true}/>
                }
            </Container>

        </React.Fragment>
    )
}

export default Shop
