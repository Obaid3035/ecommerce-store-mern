import React, { useState } from 'react'
import './Seo.scss'
import {Container, Tabs, Tab} from "react-bootstrap";
import SeoForm from './SeoForm/SeoForm';
import { PAGE} from "../../../../Interfaces";

const SEO = () => {
    const [key, setKey] = useState<string>(PAGE.home)
    return (
        <div className='page_responsive'>
            <h3>SEO</h3>

            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k!)
                }}
                className="mb-3 tabs"
            >

                <Tab eventKey={PAGE.home} title="Home" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.home} />
                        </div>
                    </Container>
                </Tab>

                <Tab eventKey={PAGE.about} title="About" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.about}/>
                        </div>
                    </Container>
                </Tab>

                <Tab eventKey={PAGE.contactUs} title="Contact" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.contactUs} />
                        </div>
                    </Container>
                </Tab>

                <Tab eventKey={PAGE.policy} title="Policy" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.policy} />
                        </div>
                    </Container>
                </Tab>


                <Tab eventKey={PAGE.term} title="Term" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.term} />
                        </div>
                    </Container>
                </Tab>

                <Tab eventKey={PAGE.faq} title="Faq" className={'w-100'}>
                    <Container>
                        <div className='mt-4'>
                            <SeoForm page={PAGE.faq} />
                        </div>
                    </Container>
                </Tab>



            </Tabs>
        </div >
    )
}

export default SEO
