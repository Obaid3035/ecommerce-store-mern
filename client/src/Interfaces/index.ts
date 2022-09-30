export type ICategories = {
    name: string,
    parentCategory: {
        label: string,
        value: string
    }
}

export enum PAGE {
    home= "HOME",
    about = "ABOUT",
    contactUs = "CONTACT",
    faq = "faq",
    term = "term",
    policy = "policy"
}

export enum ORDER_KEY {
    totalOrder = "TotalOrders",
    pendingOrders = "PendingOrders",
    inProgressOrders = "InProgressOrders",
    completedOrders = "CompletedOrders",
    cancelledOrders = "CancelledOrders",
    returnOrders = "ReturnOrders",
    approvedDisputeOrders = "approvedDisputeOrders"
}

export interface IProduct {
    name: string,
    description: string;
    attribute: {
        label: string,
        value: string
    };
    images: File;
    price: string;
    discountPrice: string;
    size: {
        label: string,
        value: string
    };
    quantity: number,
    productColor:{
        label: string,
        value: string
    };
    productColorSize:{
        label: string,
        value: string
    };
    weight: {
        unit: {
            label: string,
            value: string
        },
        value: string
    }
    productColorQuantity: number

}

export interface ICreateProfile {
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    image: File,
    role: string,
    isSuperAdmin: boolean
}

export type CreatRoleInterface = {
    title: string,
}
export type CreateUserInterface = {
    name: string,
    email: string,
    phoneNumber: number,
    address: string,
    role: {
        value: string,
        label: string
    }
}
export enum SEO_KEY {
    Home = "Home",
    AboutUs = "AboutUs",
    ContactUs = "ContactUs",
}


export type ShippingInterface = {
    price: number,
    freeLimit: number
}

export type SliderInterface = {
    image1: File,
    image2: File,
    image3: File,
    image4: File,
}

export type TexInterface = {
    tax: string,
}


// Auth Interfaces

export type IRegister = {
    name: string,
    email: string,
    phoneNumber: number,
    address: string,
    password: string,
    confirmPassword: string,
}

export type ILogin = {
    email: string,
    password: string,
    role: string
}
export enum LoginType {
    customer = '/login',
    admin = "/admin/login"
}

export type IForgotPass = {
    email: string,
}

export type IResetPass = {
    password: string,
    oldPassword: string,
    confirmPassword: string
}

// Career Page,Contact Page,Cart Details Interfaces

export type JobApplication = {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    applied: {
        label: string,
        value: string
    },
    date: number,
    image: File
}

export type ContactInterface = {
    name: string,
    email: string,
    textMessage: string
}


// ShippingAddress Panel Interfaces

export type SupportInterface = {
    subject: string,
    textMessage: string,
}



export interface IHome {
    _id: string,
    section_1: {
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
    section_2: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
    },

    section_3: {
        image: {
            avatar: string,
            cloudinary_id: string
        },
        heading: string
        text: string
    }

    section_4: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        heading: string
        text: string
    }

    section_5: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        heading: string
        text: string
    }

    section_6: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

    section_7: {
        title: string,
        box_1_image: {
            avatar: string,
            cloudinary_id: string
        },
        box_2_image: {
            avatar: string,
            cloudinary_id: string
        },
        box_3_image: {
            avatar: string,
            cloudinary_id: string
        },
    }


}

export interface IFaq {
    section_1: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

    section_2: {
        queries: [
            {
                question: string
                answer: string
            }
        ],
        text: string,
    }
}

export interface IContact {
    section_1: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

    section_2: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    },
    email: string,
    address: string,
    phoneNumber: string
}

export interface IAbout {
    section_1: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

    section_2: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    },
    section_3: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    },
    section_4: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

    section_5: {
        image: {
            avatar: string,
            cloudinary_id: string
        }
        text: string
    }

}



