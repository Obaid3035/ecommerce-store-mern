import React, {useEffect, useState} from 'react';
import HomeSlider from "./HomeSlider/HomeSlider";
import {Button, Col, Container, Row, Spinner} from 'react-bootstrap';
import UploadPhoto from "./UploadPhoto/UploadPhoto";
import {getHomePage} from "../../../api/cms";
import {IHome} from "../../../Interfaces";
import {useNavigate} from "react-router-dom";
import {showSeo} from "../../../api/seo";
import {Helmet} from "react-helmet";
import {ISeo} from "../../../Interfaces/site";
import {getAllColors} from "../../../api/product";
import FewProducts from "./FewProducts/FewProducts";
import Offer from "../../../Component/Offer/Offer";
import Reviews from "./Reviews/Reviews";
import {getReviews} from "../../../api/review";
import "./Home.scss";
import Loader from "../../../Component/Loader/Loader";


const Home = () => {
    const navigation = useNavigate();
    const [homePage, setHomePage] = React.useState<IHome | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [seo, setSeo] = useState<ISeo | null>(null);
    const [reviews, setReviews] = useState([]);
    const [colors, setColors] = useState([])

    useEffect(() => {
        setIsLoading(true)

        async function fetchMyAPI() {
            const seoPromise = showSeo("HOME")
            const homePagePromise = getHomePage()
            const reviewsPromise = getReviews()
            const colorsPromise = getAllColors()

            const [seo, homePage, reviews, colors] = await Promise.all([seoPromise, homePagePromise, reviewsPromise, colorsPromise])
            setSeo(seo.data)
            setReviews(reviews.data)
            setHomePage(homePage.data)
            setColors(colors.data)
            setIsLoading(false)
        }

        fetchMyAPI()

    }, [])


    if (isLoading) {
        return <Loader cms={true}/>
    }

    if (!isLoading && homePage) {
        return (
            <React.Fragment>
                {
                    seo && seo.isSaved ? (
                        <Helmet>
                            <title>{seo.seo.pageTitle}</title>
                            <meta name={seo.seo.meta.title} content={seo.seo.meta.description}/>
                        </Helmet>
                    ) : null
                }
                <HomeSlider slider={homePage.section_1}/>
                <div className='cover_section_container'>
                    <img src={homePage.section_2.image.avatar} className="img-fluid" alt={'cover_img'}/>
                </div>
                <FewProducts
                    colors={colors}
                />
                <div className='group_container'>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className='collection_img'>
                                    <img className='img-fluid' src={homePage.section_3.image.avatar} alt={'img'}/>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='collection_desc'>
                                    <div dangerouslySetInnerHTML={{__html: homePage.section_3.text}}/>
                                    <Button onClick={() => navigation("/shop")}>View Collection</Button>
                                </div>
                            </Col>
                            <Col md={6} className={'mt-4'}>
                                <div className='collection_desc'>
                                    <div dangerouslySetInnerHTML={{__html: homePage.section_4.text}}/>
                                    <Button onClick={() => navigation("/shop")}>View Collection</Button>
                                </div>
                            </Col>
                            <Col md={6} className={'mt-4'}>
                                <div className='collection_img'>
                                    <img className='img-fluid' src={homePage.section_4.image.avatar} alt={'img'}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={'group_look'}>
                    <div className='Group_bg_image' style={{
                        backgroundImage: `url(${homePage.section_5.image.avatar})`,
                        color: "white"
                    }}>
                        <div className='mt-2 w-50 text-center'>
                            <div dangerouslySetInnerHTML={{__html: homePage.section_5.text}}/>
                            <Button> Contact us </Button>
                        </div>
                    </div>
                </div>

                <UploadPhoto section6={homePage.section_6}/>
                <Offer section7={homePage.section_7}/>
                <Reviews reviews={reviews}/>
            </React.Fragment>
        )
    }

    return null
};
export default Home;
