import ProductController from "./controller/admin/product.controller";
import CustomerProductController from "./controller/product.controller";
import UserController from "./controller/user.controller";
import ProfileController from "./controller/admin/profile.controller";
import SubCategoryController from "./controller/admin/subCategory.controller";
import AttributeController from "./controller/admin/attribute.controller";
import CouponController from "./controller/admin/coupon.controller";
import ColorController from "./controller/admin/color.controller";
import AdminUserController from "./controller/admin/user.controller";
import RoleController from "./controller/admin/role.controller";
import TaxController from "./controller/admin/tax.controller";
import CustomerOrderController from "./controller/order.controller";
import CustomerReviewController from "./controller/review.controller";
import EGiftController from "./controller/admin/eGift.controller";
import OrderController from "./controller/admin/order.controller";
import ReviewController from "./controller/admin/review.controller";
import PictureApprovalController from "./controller/admin/pictureApproval.controller";
import CustomerEGiftController from "./controller/eGift.controller";

import App from "./app";
import WishlistController from "./controller/wishlist.controller";
import CmsController from "./controller/admin/cms.controller";
import SeoController from "./controller/admin/seo.controller";
import ParentCategoryController from "./controller/admin/parentCategory.controller";

new App([
    new ProductController(),
    new UserController(),
    new ProfileController(),
    new SubCategoryController(),
    new AttributeController(),
    new CustomerProductController(),
    new CouponController(),
    new ColorController(),
    new AdminUserController(),
    new RoleController(),
    new TaxController(),
    new CustomerOrderController(),
    new EGiftController(),
    new OrderController(),
    new ReviewController(),
    new CustomerReviewController(),
    new PictureApprovalController(),
    new WishlistController(),
    new CmsController(),
    new CustomerEGiftController(),
    new SeoController(),
    new ParentCategoryController()
])
    .bootstrap()
