import React,{useState} from 'react'
import { Form, Spinner } from 'react-bootstrap'
import {  getGiftByCode } from "../../../../../api/order";
import { errorNotify } from "../../../../../utils/toast";

const GiftActivate: React.FC<any> = ({ giftCode, setGiftCode,setGiftDiscount,setDiscount,gift,setGift,discount}) => {
    const [isLoading, setIsLoading] = useState(false)

    const onGiftSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        getGiftByCode(giftCode)
            .then((res:any) => {
                setIsLoading(false)
                setGiftDiscount(res.data.price)
                if (gift) {
                    setDiscount((discount - gift.price) + res.data.price)
                } else {
                    setDiscount(discount + res.data.price)
                }
                setGift(res.data)
            })
            .catch((err:any) => {
                errorNotify(err.response.data.message)
                setIsLoading(false)
            })
            .finally(() => {
                setGiftCode("")
            })
    }
    return (
        <Form onSubmit={onGiftSubmit}>
            <Form.Group className="mb-3">
                <label>Enter E-gift</label>
                <Form.Control value={giftCode} onChange={(e) => setGiftCode(e.target.value)}
                              type="text" required placeholder="Enter E-gift" />
            </Form.Group>
            {
                !isLoading ?
                    <button className='proceed_step'>Activate</button>
                    : (
                        <div className="text-center">
                            <Spinner animation={"border"} />
                        </div>
                    )
            }
        </Form>
    )
}

export default GiftActivate
