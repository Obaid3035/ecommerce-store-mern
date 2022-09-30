import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import "./Offer.scss";

const Offer = ({section7}: any) => {

    return (
        <div className={'offer_section'}>
            <div className={"text-center"}>
                <div dangerouslySetInnerHTML={{__html: section7.title}}/>
            </div>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={3} className={'p-0'}>
                        <div className={'freeShip'}>
                            <img width="150" height="150" alt={"BOX_1"} src={section7.box_1_image.avatar}/>
                        </div>

                    </Col>
                    <Col md={4} className={'p-0'}>
                        <div className={'freeShip_inspired'}>
                            <img width="200" height="200" alt={"BOX_1"} src={section7.box_2_image.avatar}/>

                        </div>
                    </Col>
                    <Col md={3} className={'p-0'}>
                        <div className={'freeShip'}>
                            <img width="150" height="150" alt={"BOX_1"} src={section7.box_3_image.avatar}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Offer;
