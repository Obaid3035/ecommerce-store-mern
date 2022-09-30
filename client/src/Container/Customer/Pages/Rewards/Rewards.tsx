import React, {useEffect, useState} from 'react'
import {Form, Modal, Spinner} from 'react-bootstrap'
import './Rewards.scss';
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";
import {getCustomerGift, buyGiftCard} from "../../../../api/gift";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {createPaymentIntent} from "../../../../api/order";
import {getCurrentUser} from "../../../../utils/helper";
import {errorNotify, successNotify} from "../../../../utils/toast";
import SiteModal from "../../../../Component/SiteModal/SiteModal"


const GiftCard = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false)
    const [giftInput, setGiftInput] = useState<any>(null)

    useEffect(() => {
        setIsLoading(true);
        getCustomerGift(page)
            .then((res) => {
                setData(res.data)
                setIsLoading(false);
            })
    }, [page])

    const onPayModalHandler = (giftId: string, amount: number) => {
        setGiftInput({
            amount,
            giftId
        })
        setShow(!show)
    }

    const onBuyGiftCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if (!stripe || !elements) {
            setIsLoading(false)
            return;
        }

        const cardElement = elements.getElement(CardElement)!
        const paymentSecret = await createPaymentIntent({
            totalAmount: giftInput.amount,
            email: getCurrentUser().email
        })

        const card = await stripe.confirmCardPayment(paymentSecret.data.secret, {
            payment_method: {
                card: cardElement,
            }
        })

        if (card.error) {
            setIsLoading(false)
            errorNotify(card.error.message!)
        } else {
            const res = await buyGiftCard({
                giftId: giftInput.giftId
            })
            successNotify(res.data.message)
            setShow(!show)
            setIsLoading(false)
        }
    }

    const columns = [{
        name: "ID",
        options: {
            display: false,
        },
    },
        "E-Gift Card Name", "Description", "Amount", {
            name: "Actions",
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <button className={'btn mx-2'} onClick={() =>  onPayModalHandler(tableMeta.rowData[0], tableMeta.rowData[3])}>
                            Buy
                        </button>
                    )
                }
            },
        }]


    return (
        <div className='page_responsive'>
            <SiteModal modalTitle={"Payment"} size={"lg"} handleClose={() => setShow(!show)} show={show} >
                <Form onSubmit={onBuyGiftCard}>
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

                    {
                        !isLoading ?
                            (
                                <div className={"text-center"}>
                                    <button type={"submit"} className='proceed_step'>
                                        Buy
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation={"border"}/>
                                </div>
                            )
                    }
                </Form>
            </SiteModal>
            <h3>E-Gift Card</h3>
            <div className="coupon_container">
                <MuiDataTable isLoading={isLoading} data={data} columns={columns} page={page} setPage={setPage}/>
            </div>
        </div>
    );
}
export default GiftCard
