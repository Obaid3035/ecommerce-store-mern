import React, { useState } from 'react'
import { Form, Spinner, OverlayTrigger, Popover } from 'react-bootstrap'
import { CardElement } from "@stripe/react-stripe-js";


const CheckoutPayment: React.FC<any> = ({ setPaymentMethod, paymentMethod, getTotalPrice }) => {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">COD</Popover.Header>
            <Popover.Body>
                Only choose this option if you live within 10 miles of U.S. zip code "98371".
                This option accepts Zelle, CashApp, Venmo,
                and more and allows customers to pay in person and pick up their orders at an agreed location.
            </Popover.Body>
        </Popover>
    );
    return (
        <div className="Address_delivery_container">
            <div>
                <h4 className="mt-2">Payment Method</h4>
                <p>Your order will be delivered to you within 5 working days</p>
                <div>
                    <input type="radio" id='payment' name="cash" checked={paymentMethod === "card"}
                           onChange={(e) => setPaymentMethod(e.target.value)} value={'card'} />
                    <span className={"mx-2"}>Payment by Cards</span>
                </div>
                <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                    <div>
                        <input type="radio" id='cash' name="cash" checked={paymentMethod === "cod"}
                               onChange={(e) => {
                                   setPaymentMethod(e.target.value)
                               }} value={'cod'} />
                        <span className={"mx-2"}>Cash on Delivery</span>
                    </div>
                </OverlayTrigger>
            </div>
            {paymentMethod === "card" && getTotalPrice() > 0 ?
                <React.Fragment>
                    <Form.Group>
                        <Form.Label className={"mt-3"}>Card Details</Form.Label>
                        <CardElement
                            className={"mb-3"}
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '20px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </Form.Group>
                </React.Fragment>
                : null
            }
        </div>
    )
}

export default CheckoutPayment
