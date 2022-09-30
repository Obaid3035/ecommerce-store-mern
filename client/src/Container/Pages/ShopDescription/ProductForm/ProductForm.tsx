import React, {useState} from 'react'
import {errorNotify} from "../../../../utils/toast";
import { useNavigate } from "react-router-dom";
import './ProductForm.scss'
import {getDecryptedCartItems, size, storeEncryptedCartItems} from "../../../../utils/helper";

interface ProductForm {
    product: any
}

const ProductForm: React.FC<ProductForm> = ({product}) => {
    const [value, setValue] = useState(0)
    const [color, setColor] = useState(null)
    const navigation = useNavigate();

    const plus = () => {
        setValue(value + 1)
    }
    const minus = () => {
        if(value <= 0) {
            setValue(0)
        } else {
            setValue(value - 1)
        }
    }

    const [selectInventory, setSelectInventory] = useState<any>(null)


    const selectedInventory = (size: string) => {
        const inventoryClone = product.inventory.concat();
        const found = inventoryClone.find((inventory: any) => {
            return (inventory.color._id === color) && (inventory.size === size)
        })
        setSelectInventory(found)
    }

    const getProductSize = () => {
        const inventoryClone = product.inventory.concat();
        const inventory = inventoryClone.filter((inventory: any) => {
            return inventory.color._id === color;
        }).map((inventory: any) => {
            return inventory.size
        })

        return (
            <div className='size_container'>
                <h5>SIZE</h5>
                <div className='button_container'>
                    {
                        size.map((size) => {
                            if (inventory.includes(size)) {
                                return (
                                    <button className={selectInventory && selectInventory.size  === size ? "active_border" : ""}
                                            onClick={() => selectedInventory(size)}>{size}</button>
                                )
                            } else {
                                return (
                                    <button disabled>{size}</button>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    const onAddCartHandler = () => {

        if (value <= 0) {
            errorNotify(`Quantity must be greater than zero`)
        } else if (selectInventory && selectInventory.quantity < value) {
            errorNotify(`Only ${selectInventory.quantity} left`)
        } else {
            const cartItem: any = getDecryptedCartItems();
            const foundIndex = cartItem.findIndex((item: any) => item.inventory._id === selectInventory._id);
            if (foundIndex >= 0) {
                cartItem[foundIndex].qty += value;
                if (selectInventory && selectInventory.quantity < cartItem[foundIndex].qty) {
                    errorNotify(`Only ${selectInventory.quantity} left`)
                } else {
                    storeEncryptedCartItems(cartItem)
                    navigation("/order-summary")
                }
            } else {
                const cart = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    avatar: product.images[0].avatar,
                    discountPrice: product.discountPrice > 0 ? product.price -
                        ((product.price * product.discountPrice) / 100) : product.price ,
                    qty: value,
                    inventory: {
                        ...selectInventory,
                        color: selectInventory.color.name
                    }
                }
                cartItem.push(cart)
                storeEncryptedCartItems(cartItem)
                navigation("/order-summary")
            }
        }
    }

    const getProductColor = () => {
        const resArr: any[] = [];
        product.inventory.forEach(function (item: any) {
            const i = resArr.findIndex(x => x.color._id == item.color._id);
            if (i <= -1) {
                resArr.push(item)
            }
        })

        return resArr.map((inventory) => (
            <div className={color === inventory.color._id ? "active_border" : ""}
                 style={{backgroundColor: `${inventory.color.code}`, width: "25px", height: "25px", border: "1px solid #cec8c8"}}
                 onClick={() => setColor(inventory.color._id)}/>
        ))
    }

    return (
        <div className='form_container'>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <div className='price_container'>
                {
                    product.discountPrice > 0 ? (
                       <React.Fragment>
                           <div>
                               <span className={"discount_price"}>$ {product.price - ((product.price * product.discountPrice) / 100)}</span>
                           </div>
                           <div className='mx-4'>
                               <p className='cutting_price'>${product.price}</p>
                           </div>
                       </React.Fragment>
                    ) : (
                    <React.Fragment>
                        <div className='mx-4'>
                            <span className={"actual_price"}>${product.price}</span>
                        </div>
                    </React.Fragment>
                    )
                }
            </div>

            <div className='colors_container'>
                <p>Colors</p>
                <div className='button_container'>
                    {
                        getProductColor()
                    }
                </div>
            </div>

            {
                color ? getProductSize() : null
            }

            {
                color && selectInventory ? (
                    <div className='quantity_container'>
                        <p>Quantity:</p>
                        <div className='quantity_inner_container'>
                            <div className='plus_minus_container'>
                                <div>
                                    <button onClick={minus} className='minus_btn'>-</button>
                                </div>
                                <p className='mt-2'>{value}</p>
                                <div>
                                    <button onClick={plus} className='plus_btn'>+</button>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <button className="btn" disabled={!selectInventory} onClick={onAddCartHandler}>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </div>
    )
}

export default ProductForm
