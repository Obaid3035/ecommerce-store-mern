import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import VisaImg from "../../../assets/img/visa_img.png";
import MasterImg from "../../../assets/img/master_img.png";
import WesternImg from "../../../assets/img/western_union.png";
import "./Footer.scss";
import { showMenu } from "../../../api/seo";
import { getFooter } from "../../../api/cms";
import { Spinner, Row, Container, Col } from "react-bootstrap";

const Footer = () => {

    const [footer, setFooter] = useState<any>(null)

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

        async function fetchMyAPI() {
            const menu = await showMenu();
            const footer = await getFooter();

            setFooter(footer.data)

            setMenu({
                ...menu.data
            })
        }

        fetchMyAPI()

    }, [])


    return (
        <React.Fragment>
            <div className={'footer'}>
                <Container className="justify-content-center">
                    <Row>

                        <Col md={4}>
                            {
                                footer ? (

                                    <div className={'footer_logo'}>
                                        <h2><img alt="logo" width="90" height="90" src={footer.image.avatar} /></h2>
                                        <div dangerouslySetInnerHTML={{ __html: footer.text }} />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Spinner animation={"border"} />
                                    </div>

                                )
                            }
                        </Col>

                        <Col md={4}>
                            {
                                footer ? (
                                    <ul>
                                        <li onClick={() => window.location.href = '/about'}> {menu.about}</li>
                                        <li onClick={() => window.location.href = '/shop'}>{ menu.shop } </li>
                                        <li onClick={() => window.location.href = '/faq'}>FAQ </li>
                                        <li onClick={() => window.location.href = '/contact'}> {menu.contact} </li>
                                        <li onClick={() => window.location.href = '/policy'}> RETURN POLICY </li>
                                        <li onClick={() => window.location.href = '/terms-condition'}> TERMS </li>
                                    </ul>
                                ) : (
                                    <div className="text-center">
                                        <Spinner animation={"border"} />
                                    </div>

                                )
                            }
                        </Col>

                        <Col md={4}>
                            <h1>INBOX ME!</h1>
                            <p> Sign up to our newsletter and we’ll keep you up to date with the latest arrivals </p>
                            <div className={'footer_form'}>
                                <form action="https://hohscrubs.us14.list-manage.com/subscribe/post?u=5179dc93f55fdb9958da2d7b6&amp;id=3a4206daf3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" >
                                    <input id="mce-EMAIL" placeholder={'Email address'} type="email" required />
                                    <button>Subscribe</button>
                                </form>
                            </div>

                            <div className={'footer_links'}>
                                <h2>FOLLOW US</h2>
                                <div className={'social_icons'}> <FaFacebookF /> <FaTwitter /> <FaLinkedinIn /> <FaInstagram /> </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className={'hr_tag'} />
                <div className={'all_rights'}>
                    <p>© 2021 Hands of Hope Scrubs. All Rights Reserved.</p>
                    <div className={'payment_method'}>
                        <p>Payment method</p>
                        <img src={VisaImg} alt={'visa'} />
                        <img src={MasterImg} alt={'visa'} />
                        <img src={WesternImg} alt={'visa'} />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );

};
export default Footer;
