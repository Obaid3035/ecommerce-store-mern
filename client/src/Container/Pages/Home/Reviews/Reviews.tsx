import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Slider from 'react-slick';
import Avatar from "../../../../assets/img/avatar.png"
import {ImQuotesLeft} from "react-icons/im";
import "./Reviews.scss"
import {IReview, IUser} from "../../../../Interfaces/site";



const Reviews: React.FC<{ reviews: IReview[]}> = ({ reviews}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };

    const getAvatar = (user: IUser) => {
        if (user.profilePicture && user.profilePicture.avatar) {
            return user.profilePicture.avatar
        }
        return Avatar
    }

    let data;

    if (reviews.length > 0) {
        data = (
            <Slider {...settings}>
                {
                    reviews.map((review) => (
                        <div key={review._id} className='d-flex round_container'>
                            <div className='Round_image'>
                                <img className='circle_image' alt='img' src={getAvatar(review.user)} width={200} height={200} />
                            </div>
                            <div className='text_container'>
                                <h6>{review.order.userInfo.firstName}</h6>
                                <div className='d-flex'>
                                    <div className='inverted_commas'><ImQuotesLeft /></div>
                                    <div className='clientSay_container'>
                                        <p className='mt-3 client_says'>{review.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        )
    }


    if (reviews.length == 0) {
        data = (
            <div className={"text-center"}>
                <p className={"text-muted"}>No Reviews Found</p>
            </div>
        )
    }

    return (
        <Container className={'mb-5'}>
            <Row className={'justify-content-center'}>
                <Col md={9}>
                        { data  }
                </Col>
            </Row>
        </Container>
    );
};
export default Reviews
