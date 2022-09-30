import React, {useEffect, useState} from 'react';
import {Container, Form, Nav, Navbar, NavDropdown, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import { BiSearch } from 'react-icons/bi';
import "./Header.scss";
import {getCurrentUser, getDecryptedCartItems, removeToken} from "../../../utils/helper";
import {AiOutlineHeart} from "react-icons/ai";
import {showMenu} from "../../../api/seo";
import { FiShoppingCart } from "react-icons/fi"
import {getAllParentCategory} from "../../../api/admin/parentCategory";

const Header: React.FC<{ isDashboard?: boolean}> = ({ isDashboard }) => {
    const navigation = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [parentCategory, setParentCategory] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")

    const [menu, setMenu] = useState({
        _id: "",
        shop: "",
        about: "",
        contact: "",
        promotion: "",
        logo: {
            avatar: ""
        }
    })
    useEffect(() => {

        showMenu()
            .then((res) => {
                setMenu({
                    ...res.data
                })
            })

        if (getCurrentUser()) {
            setIsAuth(true)
        }
        getAllParentCategory()
            .then((res) => {
                setParentCategory(res.data)
                setIsLoading(false)
            })
    }, [])

    const onLogOutHandler = () => {
        removeToken()
        setIsAuth(false)
    }

    return (
        <React.Fragment>
            <div className={'header'}>
                <Container>
                    <Navbar expand="lg">
                        <Container>
                            <p>{ menu.promotion }</p>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end'}>
                                <Nav className="mr-auto">
                                    <Nav.Link onClick={() => window.location.href = "/shop"}> { menu.shop }</Nav.Link>
                                    {
                                        !isAuth ? (
                                            <Nav.Link> <Link to={'/login'}> LOG IN </Link></Nav.Link>
                                        ) : (
                                            <React.Fragment>
                                                <Nav.Link> <Link to={getCurrentUser().roleName === "customer"  ? '/customer/profile' : '/admin/profile'}> My Account </Link></Nav.Link>
                                                <Nav.Link onClick={onLogOutHandler}> LOG OUT</Nav.Link>
                                            </React.Fragment>
                                        )
                                    }

                                    <Nav.Link>
                                        <Link to="/order-summary">
                                            <div className="addtocard_container">
                                                <FiShoppingCart />
                                                <span>{getDecryptedCartItems().length}</span>
                                            </div>
                                        </Link>
                                    </Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </div>
            {
                !isDashboard ? (
                    <React.Fragment>
                        <Container>
                            <div className={'logo_section'}>
                                <div>
                                    <img alt={"Logo"} src={menu.logo.avatar} width={200} height={80} onClick={() => window.location.href = "/"}/>
                                </div>

                                <div className={'icon_section d-flex'}>
                                    {isOpen ?
                                        <div className="search_container">
                                            <Form.Control value={search}
                                                          onChange={(e) => setSearch(e.target.value)}
                                                          placeholder="Enter any keywords" type="search" />
                                            <button className={"btn text-right mt-2"}
                                                    onClick={() => navigation(window.location.href = `/shop?search=${search}`)}
                                            >Search</button>
                                        </div>

                                        : null
                                    }

                                    <BiSearch className="search_icon" onClick={() => setIsOpen(!isOpen)} />
                                    <div className={"addtocard_container"}>
                                        {
                                            isAuth ? (
                                                <Link className={'ml-2'} to="/wishlist">
                                                    <AiOutlineHeart/>
                                                </Link>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <hr className={'divider'} />
                        <div className={'collection_section'}>
                            <Container>
                                <Navbar style={{overflow: 'visible'}} expand="lg">
                                    <Container>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav1" />
                                        <Navbar.Collapse id="basic-navbar-nav1" className={'justify-content-center'}>
                                            <Nav className="mr-auto">
                                                {
                                                    !isLoading ? (
                                                        parentCategory.length > 0 ? (
                                                            parentCategory.map((parentCategory: any) => (
                                                                <React.Fragment>
                                                                    {
                                                                        parentCategory.subCategory.length > 0 ? (
                                                                            <NavDropdown title={parentCategory.name} id="navbarScrollingDropdown">
                                                                                {
                                                                                    parentCategory.subCategory.map((subCategory: any) => (
                                                                                        <NavDropdown.Item onClick={() => window.location.href = `/shop?parentCategory=${parentCategory._id}&subCategory=${subCategory._id}`}>
                                                                                            {subCategory.name}
                                                                                        </NavDropdown.Item>
                                                                                    ))
                                                                                }
                                                                            </NavDropdown>
                                                                        ) :  <Nav.Link key={parentCategory._id} onClick={() => window.location.href = `/shop?parentCategory=${parentCategory._id}`}>{parentCategory.name}</Nav.Link>

                                                                    }

                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <div className="text-center">
                                                                <p>No Category Found</p>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="text-center">
                                                            <Spinner animation={"border"}/>
                                                        </div>
                                                    )
                                                }
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                            </Container>
                        </div>
                    </React.Fragment>
                ) : null
            }
        </React.Fragment>
    );
};
export default Header;
