import React, { memo } from 'react';
import {GrClose} from "react-icons/gr";

interface ICartItem {
    data: {
        _id: string,
        avatar: string,
        inventory: {
            _id: string,
            color: string,
            size: string,
        }
        price: number
        name: string,
        discountPrice: number,
        qty: number,
    },
    minus: (inventoryId: string) => void,
    plus: (inventoryId: string, qty: number) => void,
    onRemoveItemHandler: (inventoryId: string) => void,
    editable: boolean
}

const CartItem: React.FC<ICartItem> = ({ data, minus, editable, onRemoveItemHandler, plus}) => {
    return (
        <tr>
            <td>
                <div className='summer_vibes_container' onClick={() => window.location.href = `shop-description/${data._id}`}>
                    <div className='img_container'>
                        <img src={data.avatar} alt='product_logo' />
                    </div>
                    <div>
                        <b>{data.name}</b>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <span>{data.inventory.color}</span>
                </div>
            </td>
            <td>
                <div>
                    <span>{data.inventory.size}</span>
                </div>
            </td>
            <td>
                <div>
                    <b>{data.discountPrice <= 0 ? data.price : data.discountPrice}</b>
                </div>
            </td>
            {
                editable ? (
                    <td>
                        <div className='plus_minus_container'>
                            <div>
                                <button onClick={() => minus(data.inventory._id)} className='minus_btn'>-</button>
                            </div>
                            <p className='mt-2'>{data.qty}</p>
                            <div>
                                <button onClick={() => plus(data.inventory._id, data.qty)} className='plus_btn'>+</button>
                            </div>
                        </div>
                    </td>
                ) : null
            }
            <td>
                <div>
                    <GrClose className='cross_icon' onClick={() => onRemoveItemHandler(data.inventory._id)} />
                </div>
            </td>
        </tr>
    );
};

export default CartItem;
