import React from 'react';
import {useNavigate} from "react-router-dom";

const AddressInfo: React.FC<any> = ({ shippingDetail, totalPrice }) => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <h6>Address Delivery</h6>
            <p>Address: {shippingDetail.address}</p>
            <p>Email: {shippingDetail.email}</p>
            <p>Phone Number: {shippingDetail.phoneNumber}</p>
            <button className='shopping' onClick={() => navigate("/address-data")}>CHANGE ADDRESS</button>
            <div className='total_cost'>
                <div>
                    <span>Total Cost</span>
                </div>
                <div>
                    <span> <b>$ {totalPrice}</b> </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddressInfo;
