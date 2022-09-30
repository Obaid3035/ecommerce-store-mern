import React, {useEffect, useState} from 'react';
import {Container, Spinner} from "react-bootstrap";
import "./Policy.scss";
import {getPolicy} from "../../../api/cms";
import {IAbout} from "../../../Interfaces";
import Loader from "../../../Component/Loader/Loader";

const Policy = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [policy, setPolicy] = useState<IAbout | null>(null);

    useEffect(() => {
        setIsLoading(true)
        getPolicy()
            .then((res) => {
                setIsLoading(false)
                setPolicy(res.data)
            })
    }, [])


    if (isLoading) {
        return <Loader cms={true}/>
    }

    if (!isLoading && policy) {
        return  (
            <React.Fragment>
                <div className={"policy_bg"} style={{
                    backgroundImage: `url(${policy.section_1.image.avatar})`
                }}>
                    <div dangerouslySetInnerHTML={{__html: policy.section_1.text}}/>
                </div>

                <Container className={'return_policy'}>
                    <div dangerouslySetInnerHTML={{__html: policy.section_2.text}}/>
                </Container>
            </React.Fragment>
        )
    }

    return null
};
export default Policy;
