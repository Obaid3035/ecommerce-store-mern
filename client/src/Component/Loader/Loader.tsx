import React from "react"
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader: React.FC<{ cms: boolean}> = ({cms}) => {
    return (
        <div className={cms ? 'cms_section' : 'text-center'}>
            <Spinner animation={'border'} />
        </div>
    )
}

export default Loader;
