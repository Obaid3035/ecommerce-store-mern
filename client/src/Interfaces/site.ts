export interface ISeo {
    seo: {
        pageTitle: string,
        meta: {
            title: string,
            description: string
        }
    },
    isSaved: boolean
}

export interface IHomeSlider {
    slider: {
        slider_1: {
            image:  {
                avatar: string,
                cloudinary_id: string,
            },
            text: string
        },
        slider_2: {
            image:  {
                avatar: string,
                cloudinary_id: string,
            },
            text: string
        },
        slider_3: {
            image:  {
                avatar: string,
                cloudinary_id: string,
            },
            text: string
        }
    }
}


export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    profilePicture: {
        avatar: string;
        cloudinary_id: string;
    };
    roleName: string
    isSuperAdmin: boolean
    role: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    productIdentifier: string
    images: {
        avatar: string;
        cloudinary_id: string;
    }[];
    size: string,
    price: number;
    discountPrice: number;
    quantity: number;
    isColor: boolean;
    inventory: {
        _id: string,
        color: string;
        size: string,
        quantity: number
    }[]
    category: string;
    attribute: string;
    productType: string;
}

export interface IOrder{
    skuId: string,
    amount: number
    cart: {

        _id: string
        name: string
        price: number
        avatar: string
        discountPrice: number
        qty: number
        inventory:  {
            color: string
            size: number
        },

    }[]
    disputeMessage: string
    totalAmount: number,
    paymentMethod: string,
    userInfo: {
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        postalCode: string,
        phoneNumber: string,
        email: string,
        state: {
            _id: string,
            name: string
        }
    },
    sameAsShippingAddress: boolean,
    billingAddress: {
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        postalCode: string,
        phoneNumber: string,
        email: string,
        state: {
            _id: string,
            name: string
        }
    }
    user: IUser,
    status: string
}

export interface IReview {
    _id: string
    text: string
    approved: boolean,
    user: IUser,
    order: IOrder,
}



