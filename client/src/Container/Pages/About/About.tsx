import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Banner from "../../../Component/Banner/Banner";
import "./About.scss";
import { getAboutPage } from "../../../api/cms";
import { IAbout } from "../../../Interfaces";
import { showSeo } from "../../../api/seo";
import { Helmet } from "react-helmet";
import About4 from '../../../assets/img/about4.png'

const About = () => {
    const [seo, setSeo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [aboutPage, setAboutPage] = useState<IAbout | null>(null);

    useEffect(() => {
        setIsLoading(true)

        async function fetchMyAPI() {
            let seoPromise = showSeo("ABOUT")
            let aboutPagePromise = getAboutPage()
            const [seo, aboutPage] = await Promise.all([seoPromise, aboutPagePromise])
            setSeo(seo.data)
            setAboutPage(aboutPage.data)
            setIsLoading(false)
        }

        fetchMyAPI()
    }, [])


    if (isLoading) {
        return (
            <div className={"text-center"}>
                <Spinner animation={"border"} />
            </div>
        )
    }

    if (!isLoading && aboutPage) {
        return (
            <React.Fragment>
                {
                    seo && seo.isSaved ? (
                        <Helmet>
                            <title>{seo.seo.pageTitle}</title>
                            <meta name={seo.seo.meta.title} content={seo.seo.meta.description} />
                        </Helmet>
                    ) : null
                }
                <Banner heading={'ABOUT US'} cssClass={'about_main'} />
                <div className={'about_section'}>
                    <Container>
                        <Row className={'mt-5 justify-content-center align-items-center'}>
                            <Col md={6}>
                                <div className='about_section1_text' dangerouslySetInnerHTML={{ __html: aboutPage.section_2.text }} />
                            </Col>
                            <Col md={6} className={'p-0'}>
                                <div className={'about_img_section'}>
                                    <img src={aboutPage.section_2.image.avatar} alt={'doc-img'} />
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className={'about_med_scrub'}>
                        <Row className={'mt-5 justify-content-center align-items-center'}>
                            <Col md={6}>
                                <img src={aboutPage.section_3.image.avatar} alt={"section2-img"} />
                            </Col>
                            <Col md={6}>
                                <div className={'about_med_scrub_right'}>
                                    <div dangerouslySetInnerHTML={{ __html: aboutPage.section_3.text }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className={'wear_section'}>
                        <Row className={'mt-5 justify-content-center align-items-center'}>
                            <Col md={6}>
                                <div className={'wear_text_section'}>
                                    <div dangerouslySetInnerHTML={{ __html: aboutPage.section_4.text }} />
                                </div>

                            </Col>
                            <Col md={6}>
                                <div className={'wear_img_section'}>
                                    <img src={aboutPage.section_4.image.avatar} alt={'wear-img'} />
                                </div>
                            </Col>
                        </Row>
                    </Container>


                    <Container className={'achievement_section'}>
                        <Row className={'mt-5 justify-content-center align-items-center'}>
                            <Col md={6}>
                                <div>
                                    <img src={aboutPage.section_5.image.avatar} alt={'wear-img'} />
                                </div>

                            </Col>
                            <Col md={6}>
                                <div className={'achievement_text_section'}>
                                    <div dangerouslySetInnerHTML={{ __html: aboutPage.section_5.text }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>



                </div>
            </React.Fragment>
        )
    }

    return null
};
export default About;
