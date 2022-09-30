import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Accordion,Spinner } from 'react-bootstrap'
import './Faq.scss'
import {getFaq} from "../../../api/cms";
import {IFaq} from "../../../Interfaces";
import Loader from "../../../Component/Loader/Loader";

const Faq = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [faq, setFaq] = useState<IFaq | null>(null);

    useEffect(() => {
        setIsLoading(true)
        getFaq()
            .then((res) => {
                setFaq(res.data)
                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return <Loader cms={true}/>
    }

    if (!isLoading && faq) {
        return  (
            <React.Fragment>
                <div className={"about_main"} style={{
                    backgroundImage: `url(${faq?.section_1.image.avatar})`
                }}>
                    <div dangerouslySetInnerHTML={{__html: faq.section_1.text}}/>
                </div>
                <Container>
                    <div className="faq_head" dangerouslySetInnerHTML={{__html: faq.section_2.text}}/>
                    <Row>
                        <Col md={12}>
                            <div className="faq_container">
                                {
                                    faq.section_2.queries.length > 0 ? (
                                        faq.section_2.queries?.map((faq, i) => {
                                            const { question, answer } = faq
                                            return (
                                                <React.Fragment>
                                                    <Accordion>
                                                        <Accordion.Item className="mt-3" eventKey={i.toString()}>
                                                            <Accordion.Header>Q: {question}</Accordion.Header>
                                                            <Accordion.Body>
                                                                Ans: {answer}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <div className="text-center">
                                            <p>No QA found</p>
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        )
    }

    return  null
}

export default Faq
