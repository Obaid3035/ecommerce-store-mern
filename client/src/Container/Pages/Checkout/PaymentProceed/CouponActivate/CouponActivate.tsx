import React,{useState} from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { getCouponByCode } from "../../../../../api/order";
import { errorNotify } from "../../../../../utils/toast";

const CouponActivate: React.FC<any> = ({ couponCode, setCouponCode, setCouponDiscount, coupon, setCoupon, discount,setDiscount,totalPrice, costDetail }) => {
    const [isLoading, setIsLoading] = useState(false)
    console.log("TOTAL PRICE", totalPrice)
    const onCouponSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        getCouponByCode(couponCode)
            .then((res) => {
                if ((totalPrice + ((totalPrice * costDetail.tax) / 100) + costDetail.shippingCost) < res.data.priceLimit) {
                    errorNotify("Coupon is not eligible for this amount")
                } else {
                    setCouponDiscount(res.data.discountPrice)
                    let discountedPrice = ((totalPrice * res.data.discountPrice) / 100)
                    if (coupon) {
                        setDiscount(discount - ((totalPrice * coupon.discountPrice) / 100) + discountedPrice)
                    } else {
                        setDiscount(discount + discountedPrice)
                    }
                    setCoupon(res.data)
                }

            })
            .catch((err) => {
                errorNotify(err.response.data.message)
            })
            .finally(() => {
                setCouponCode("")
                setIsLoading(false)
            })
    }

    return (
        <Form onSubmit={onCouponSubmit}>
            <Form.Group className="mb-3">
                <label>Enter Coupons</label>
                <Form.Control value={couponCode} required
                              onChange={(e) => setCouponCode(e.target.value)}
                              type="text" placeholder="Enter coupon code" />
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

export default CouponActivate
