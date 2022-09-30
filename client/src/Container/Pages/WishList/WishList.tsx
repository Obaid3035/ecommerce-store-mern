import React, {useEffect} from 'react'
import {Container, Spinner, Table} from 'react-bootstrap';
import {GrClose} from 'react-icons/gr';
import Banner from "../../../Component/Banner/Banner";
import {successNotify} from "../../../utils/toast";
import {deleteWishList, getWishList} from "../../../api/wishList";

const WishList = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [wishList, setWishList] = React.useState<any>([]);

    useEffect(() => {
        setIsLoading(true);
        getWishList()
            .then((res) => {
                setIsLoading(false)
                setWishList(res.data)
            })
    }, [])

    const onRemoveWishListItemHandler = (wishListId: string) => {
        setIsLoading(true)
        deleteWishList(wishListId)
            .then((res) => {
                setIsLoading(false)
                successNotify(res.data.message)
                const wishListClone = wishList.concat();
                const found = wishListClone.findIndex((wishlist: any) => wishlist._id === wishListId);
                wishListClone.splice(found, 1);
                setWishList(wishListClone)
            })
    }

    return (
        <React.Fragment>
            <Banner heading={'WISHLIST'} cssClass={'shop_main'}/>
            <Container>
                <h5 className='mt-4'>WishList Summary</h5>
                <div className='summary_container'>
                    {
                        !isLoading ? (
                            wishList.length > 0 ?
                                <Table>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>

                                    {
                                        (
                                            wishList.map((data: any) => (
                                                <tr>
                                                    <td>
                                                        <div className='summer_vibes_container' onClick={() => window.location.href = `shop-description/${data.product._id}`}>
                                                            <div className='img_container'>
                                                                <img src={data.product.images[0].avatar} alt='product_logo'/>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <b>{data.product.name}</b>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <b>$ {data.product.price - ((data.product.price * data.product.discountPrice) / 100)}</b>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                     <span>
                                                         <GrClose className='cross_icon'
                                                                  onClick={() => onRemoveWishListItemHandler(data._id)}/>
                                                     </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }


                                </Table>
                                : (
                                    <div className="text-center">
                                        <p>Wishlist not found</p>
                                    </div>
                                )
                        ) : (
                            <div className="text-center">
                                <Spinner animation={"border"}/>
                            </div>
                        )
                    }

                </div>
            </Container>
        </React.Fragment>
    )
}
export default WishList
