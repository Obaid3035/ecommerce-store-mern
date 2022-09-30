import React, {useEffect, useState} from 'react';
import "./TermsCondition.scss";
import {Container, Spinner} from "react-bootstrap";
import Banner from "../../../Component/Banner/Banner";
import {IFaq} from "../../../Interfaces";
import {getFaq, getTerm} from "../../../api/cms";

const TermsCondition = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [term, setTerm] = useState<IFaq | null>(null);

    useEffect(() => {
        setIsLoading(true)
        getTerm()
            .then((res) => {
                setTerm(res.data)
                setIsLoading(false)
            })

    }, [])


    if (isLoading) {
        return  (
            <div className="text-center">
                <Spinner animation={"border"}/>
            </div>
        )
    }


    if (!isLoading && term) {
        return  (
            <React.Fragment>
                <div className={"policy_bg"} style={{
                    backgroundImage: `url(${term.section_1.image.avatar})`
                }}>
                    <div dangerouslySetInnerHTML={{__html: term.section_1.text}}/>
                </div>
                <Container>
                    <div className={'terms_condition'} dangerouslySetInnerHTML={{__html: term.section_2.text}}/>
                </Container>
            </React.Fragment>
        )
    }

    return  null

};

export default TermsCondition;
