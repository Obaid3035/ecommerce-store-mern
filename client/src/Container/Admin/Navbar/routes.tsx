import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import {HiReceiptTax} from "react-icons/hi";
import {FaCriticalRole} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";

import Profile from "../Pages/Profile/Profile";
import Orders from "../Pages/Order/Order";
import Taxes from "../Pages/Taxes/Taxes";
import ShippingCost from "../Pages/ShippingCost/ShippingCost";
import Coupons from "../Pages/Coupons/Coupons";
import CreateCoupons from "../Pages/Coupons/CreateCoupons/CreateCoupons";
import SubCategory from "../Pages/SubCategory/SubCategory";
import Attributes from "../Pages/Attributes/Attributes";
import Products from "../Pages/Products/Product";
import CreateProduct from "../Pages/Products/CreateProduct/CreateProduct";
import CreateUser from "../Pages/Users/CreateUser/CreateUser";
import Role from "../Pages/Role/Role";
import CreateRole from "../Pages/Role/CreateRole/CreateRole";
import EditMenu from "../Pages/EditMenu/EditMenu";
import PictureApproval from "../Pages/PictureApproval/PictureApproval";
import Review from "../Pages/Review/Review";
import Seo from "../Pages/Seo/Seo";
import EditPages from "../Pages/EditPages/EditPages";
import EditCategory from "../Pages/SubCategory/CreateSubCategory/CreateSubCategory";
import CreateAttribute from "../Pages/Attributes/CreateAttribute/CreateAttribute";
import Users from "../Pages/Users/Users";
import Colors from "../Pages/Colors/Color";
import CreateColor from "../Pages/Colors/CreateColor/CreateColor";
import Graph from "../Pages/Graph/Graph";
import GiftCard from "../Pages/GiftCard/GiftCard";
import CreateEGiftCard from "../Pages/GiftCard/CreateGiftCard/CreateEGiftCard";
import EGiftCardHisotry from "../Pages/GiftCardHistory/GiftCardHistory";
import OrderDetails from "../../../Component/OrderDetails/OrderDetails";
import ResetPassword from "../../Auth/ResetPassword/ResetPassword";
import React from "react";
import EditProduct from "../Pages/Products/EditProduct/EditProduct";
import EditAbout from "../Pages/EditPages/EditAbout/EditAbout";
import EditHome from "../Pages/EditPages/EditHome/EditHome";
import EditFooter from "../Pages/EditPages/EditFooter/EditFooter";
import ParentCategory from "../Pages/ParentCategory/ParentCategory";
import CreateParentCategory from "../Pages/ParentCategory/CreateParentCategory/CreateParentCategory";
import EditContact from "../Pages/EditPages/EditContact/EditContact";
import EditTerm from "../Pages/EditPages/EditTerm/EditTerm";
import EditPolicy from "../Pages/EditPages/EditPolicy/EditPolicy";
import EditFaq from "../Pages/EditPages/EditFaq/EditFaq";
import {ISideBar} from "../../../Component/Sidebar/Sidebar";

export interface RoutesLink {
    component: JSX.Element;
    path: string;
}


export const adminRoutes: RoutesLink[] = [
    {
        path: "/admin/profile",
        component: <Profile/>,
    },
    {
        path: "/admin/orders",
        component: <Orders/>,
    },
    {
        path: "/admin/taxes",
        component: <Taxes/>,
    },
    {
        path: "/admin/edit-footer",
        component: <EditFooter/>,
    },
    {
        path: "/admin/coupons",
        component: <Coupons/>,
    },
    {
        path: "/admin/create-coupon",
        component: <CreateCoupons/>,
    },
    {
        path: "/admin/edit-coupon/:id",
        component: <CreateCoupons/>,
    },
    {
        path: "/admin/shipping-cost",
        component: <ShippingCost/>,
    },
    {
        path: "/admin/product-type",
        component: <ParentCategory/>,
    },
    {
        path: "/admin/create-product-type",
        component: <CreateParentCategory/>,
    },

    {
        path: "/admin/create-product-type/:id",
        component: <CreateParentCategory/>,
    },
    {
        path: "/admin/categories",
        component: <SubCategory/>,
    },
    {
        path: "/admin/create-categories",
        component: <EditCategory/>,
    },
    {
        path: "/admin/create-categories/:id",
        component: <EditCategory/>,
    },
    {
        path: "/admin/attributes",
        component: <Attributes/>,
    },
    {
        path: "/admin/create-attributes",
        component: <CreateAttribute/>,
    },
    {
        path: "/admin/create-attributes/:id",
        component: <CreateAttribute/>,
    },
    {
        path: "/admin/products",
        component: <Products/>,
    },
    {
        path: '/admin/edit-product/:id',
        component: <EditProduct/>,
    },
    {
        path: "/admin/create-product",
        component: <CreateProduct/>,
    },
    {
        path: "/admin/create-user",
        component: <CreateUser/>,
    },
    {
        path: "/admin/create-user/:id",
        component: <CreateUser/>,
    },
    {
        path: "/admin/role",
        component: <Role/>,
    },
    {
        path: "/admin/create-role",
        component: <CreateRole/>,
    },
    {
        path: "/admin/edit-role/:id",
        component: <CreateRole/>,
    },
    {
        path: "/admin/edit-menu",
        component: <EditMenu/>,
    },
    {
        path: "/admin/picture-approval",
        component: <PictureApproval/>,
    },
    {
        path: "/admin/review-approval",
        component: <Review/>,
    },
    {
        path: "/admin/seo",
        component: <Seo/>,
    },
    {
        path: "/admin/edit-pages",
        component: <EditPages/>,
    },
    {
        path: "/admin/all-users",
        component: <Users/>,
    },
    {
        path: "/admin/colors",
        component: <Colors/>,
    },
    {
        path: "/admin/create-colors/:id",
        component: <CreateColor/>,
    },
    {
        path: "/admin/create-colors",
        component: <CreateColor/>,
    },
    {
        path: "/admin/product-graph",
        component: <Graph/>,
    },
    {
        path: "/admin/e-giftcard",
        component: <GiftCard/>,
    },
    {
        path: "/admin/create-egiftcard",
        component: <CreateEGiftCard/>,
    },

    {
        path: "/admin/create-egiftCard/:id",
        component: <CreateEGiftCard/>,
    },

    {
        path: "/admin/egiftcard-history",
        component: <EGiftCardHisotry/>,
    },

    {
        path: "/admin/order-details/:id",
        component: <OrderDetails/>,
    },
    {
        path: "/admin/reset-password",
        component: <ResetPassword/>
    },
    {
        path: "/admin/edit-faq",
        component: <EditFaq/>
    },
    {
        path: "/admin/edit-policy",
        component: <EditPolicy/>
    },
    {
        path: "/admin/edit-term",
        component: <EditTerm/>
    },
    {
        path: "/admin/edit-contact",
        component: <EditContact/>
    },
    {
        path: "/admin/edit-about",
        component: <EditAbout/>
    },
    {
        path: "/admin/edit-home",
        component: <EditHome/>
    }
];

export const adminSideBarItems: ISideBar[] = [
    {
        path: "/admin/profile",
        icon: <CgProfile/>,
        title: "Profile",
        ability: "profile"
    },
    {
        path: "/admin/orders",
        icon: <MdIcons.MdOutlineViewHeadline/>,
        title: "View Orders",
        ability: "order"
    },
    {
        path: "/admin/categories",
        icon: <MdIcons.MdCategory/>,
        title: "Sub Category",
        ability: "categories"
    },
    {
        path: "/admin/product-type",
        icon: <MdIcons.MdCategory/>,
        title: "Parent Category",
        ability: "parentCategory"
    },
    {
        path: "/admin/attributes",
        icon: <MdIcons.MdEditAttributes/>,
        title: "Attributes",
        ability: "attributes"
    },
    {
        path: "/admin/colors",
        icon: <MdIcons.MdBorderColor/>,
        title: "Colors",
        ability: "colors"
    },
    {
        path: "/admin/products",
        icon: <RiIcons.RiProductHuntFill/>,
        title: "Products",
        ability: "products"
    },
    {
        path: "/admin/coupons",
        icon: <RiIcons.RiCoupon3Line/>,
        title: "Coupons",
        ability: "coupon"
    },
    {
        path: "/admin/e-giftcard",
        icon: <MdIcons.MdAutoGraph/>,
        title: "E-Gift Card",
        ability: "giftCard"
    },

    {
        path: "/admin/egiftcard-history",
        icon: <MdIcons.MdAutoGraph/>,
        title: "E-Gift History",
        ability: "giftCardHistory"
    },
    {
        path: "/admin/picture-approval",
        icon: <MdIcons.MdOutlineApproval/>,
        title: "Picture Approval",
        ability: "pictureApproval"
    },
    {
        path: "/admin/review-approval",
        icon: <MdIcons.MdOutlineReviews/>,
        title: "Review Approval",
        ability: "reviewApproval"
    },
    {
        path: "/admin/shipping-cost",
        icon: <RiIcons.RiPriceTag3Fill/>,
        title: "Shipping Cost",
        ability: "shippingCost"
    },
    {
        path: "/admin/taxes",
        icon: <HiReceiptTax/>,
        title: "Taxes",
        ability: "taxes"
    },
    {
        path: "/admin/role",
        icon: <FaCriticalRole/>,
        title: "Role",
        ability: "role"
    },
    {
        path: "/admin/all-users",
        icon: <FiUsers/>,
        title: "Users",
        ability: "user"
    },
    {
        path: "/admin/edit-pages",
        icon: <MdIcons.MdEditNote/>,
        title: "Edit Pages",
        ability: "editPage"
    },
    {
        path: "/admin/edit-menu",
        icon: <MdIcons.MdEditNote/>,
        title: "Edit Menu",
        ability: "editMenu"
    },
    {
        path: "/admin/seo",
        icon: <MdIcons.MdOutlineCategory/>,
        title: "SEO",
        ability: "seo"
    },
    {
        path: "/admin/product-graph",
        icon: <MdIcons.MdAutoGraph/>,
        title: "Graph",
        ability: "graph"
    },
];
