import { Router } from 'express';
import { SchemaDefinitionProperty} from "mongoose";

export interface IController {
   path: string;
   router: Router;
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
   role: SchemaDefinitionProperty<string>;

   generateToken(): string;
}

export interface IRequest extends Request{
   user: IUser
}

export interface ISeo {
   page: string,
   meta: {
      title: string,
      description: string
   },
   pageTitle: string
}

export interface IRole {
   _id: string;
   title: string;
   ability: {
      profile: boolean;
      order: boolean;
      coupon: boolean;
      shippingCost: boolean;
      taxes: boolean;
      products: boolean;
      categories: boolean;
      attributes: boolean;
      pictureApproval: boolean;
      reviewApproval: boolean;
      user: boolean;
      role: boolean;
   };
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
   weight: {
      unit: string,
      value: number
   }
   inventory: {
      _id: string,
      color: SchemaDefinitionProperty<string>;
      size: string,
      quantity: number
   }[]
   subCategory: SchemaDefinitionProperty<string>;
   attribute: SchemaDefinitionProperty<string>;
   parentCategory: SchemaDefinitionProperty<string>;
}

export interface IColor {
   name: string,
   code: string
}

export interface IParentCategory {
   _id: string;
   name: string;
   subCategory: SchemaDefinitionProperty<string>[];
}

export interface ISubCategory {
   _id: string;
   name: string;
   parentCategory: SchemaDefinitionProperty<string>;
}

export interface IAttribute {
   _id: string;
   name: string;
}

export interface ICoupon {
   _id: string;
   name: string;
   code: string;
   count: number;
   discountPrice: number;
   redeemed: boolean,
   expiryDate: Date,
   usedBy: {
      user: SchemaDefinitionProperty<string>,
      count: number
   }[]
   limit: number,
   priceLimit: number
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
   },
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

export interface IFooter {
   image: {
      avatar: string,
      cloudinary_id: string
   }
   text: string
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

export interface IPictureApproval {
   avatar: string;
   cloudinary_id: string;
}

export interface IGift {
   name: string,
   codes?: {
      _id?: string,
      code: string,
      redeemed: boolean,
      user: SchemaDefinitionProperty<string>,
   }[],

   price: number,
   image: {
      avatar: string;
      cloudinary_id: string;
   },
   description: string
}

export interface IGiftHistory {
   user: SchemaDefinitionProperty<string>,
   email: string,
   giftCardPrice: number,
   giftCardName: string,
   gift: SchemaDefinitionProperty<string>,
}

export interface IMenu {
   shop: string,
   about: string,
   contact: string,
   promotion: string,
   logo: {
      avatar: string;
      cloudinary_id: string;
   },
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
   user: SchemaDefinitionProperty<string>,
   status: string
}


export interface IShipping {
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
   },
   user: SchemaDefinitionProperty<string>,
}


export interface IShoppingCost {
   price: number,
   freeLimit: number
}

export interface ITax {
   name: string,
   code: string,
   tax: number
}

export interface IWishList {
   _id: string,
   product: SchemaDefinitionProperty<string>
   user: SchemaDefinitionProperty<string>,
}

export interface IReview {
   _id: string
   text: string
   approved: boolean,
   user: SchemaDefinitionProperty<string>,
   order: SchemaDefinitionProperty<string>,
}

export interface IUploadMultipleHome {
   section_1_image_1: [{
      path: string
   }],
   section_1_image_2: [{
      path: string
   }],
   section_1_image_3: [{
      path: string
   }],
   section_2_image: [{
      path: string
   }],
   section_3_image: [{
      path: string
   }],
   section_4_image: [{
      path: string
   }],
   section_5_image: [{
      path: string
   }],
   section_6_image: [{
      path: string
   }],
   section_7_image_1: [{
      path: string
   }],
   section_7_image_2: [{
      path: string
   }],
   section_7_image_3: [{
      path: string
   }],

}

export interface IUploadMultipleAbout {
   section_1_image: [{
      path: string
   }],
   section_2_image: [{
      path: string
   }],
   section_3_image: [{
      path: string
   }],
   section_4_image: [{
      path: string
   }],
   section_5_image: [{
      path: string
   }],
}


export interface IUploadMultipleContact {
   section_1_image: [{
      path: string
   }],
   section_2_image: [{
      path: string
   }],
}

