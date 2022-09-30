import React from 'react'

const TaxAndDiscount: React.FC<any> = ({ getTotalPrice, giftDiscount, setGiftCode, setGift, setGiftDiscount, couponDiscount, gift, costDetail, setCouponCode, setCouponDiscount, coupon, setCoupon, discount, setDiscount, totalPrice }) => {


    return (
        <React.Fragment>
            <div className='total_cost'>
                <div>
                    <span>E Gift Card:</span>
                </div>
                <div>
                    <b>$ {giftDiscount}</b>
                    {
                        gift ?
                            <span className={"mx-2 cross"} onClick={() => {
                                setGift(null);
                                setGiftCode("");
                                setGiftDiscount(0)
                                setDiscount(discount - gift.price)
                            }}>X</span>
                            : null
                    }
                </div>
            </div>
            <div className='total_cost'>
                <div>
                    <span>Coupon</span>
                </div>
                <div>
                    <b>% {couponDiscount}</b>
                    {
                        coupon ?
                            <span className={"mx-2 cross"} onClick={() => {
                                setCoupon(null);
                                setCouponCode("");
                                setCouponDiscount(0)
                                setDiscount(discount - ((totalPrice * coupon.discountPrice) / 100))
                            }}>X</span>
                            : null
                    }
                </div>
            </div>

            <div className='total_cost'>
                <div>
                    <span>Total Discount</span>
                </div>
                <div>
                    <b>$ {discount.toFixed(2)}</b>
                </div>
            </div>

            <div className='total_cost'>
                <div>
                    <span>Tax</span>
                </div>
                <div>
                    <b>% {costDetail.tax}</b>
                </div>
            </div>
            <div className='total_cost'>
                <div>
                    <span>Shipping Cost</span>
                </div>
                <div>
                    <b>$ {totalPrice >= costDetail.freeLimit ? 0 : costDetail.shippingCost}</b>
                </div>
            </div>

            <div className='total_cost'>
                <div>
                    <span>Total</span>
                </div>
                <div>
                    <b>$ {getTotalPrice()}</b>
                </div>
            </div>

        </React.Fragment >
    )
}

export default TaxAndDiscount
