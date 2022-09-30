import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import inputValidation from "../../../../../lib/Validation";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import { createCoupon, editCoupon, getCouponById } from "../../../../../api/admin/coupon";
import moment from "moment";

interface ICoupons {
  name: string,
  code: string,
  discountPrice: number,
  limit:number,
  expiryDate:Date
  priceLimit: number
}


const CreateCoupons = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ICoupons>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAddMode) {
      getCouponById(id!)
        .then((res) => {
          setValue("name", res.data.name)
          setValue("code", res.data.code)
          setValue("discountPrice", res.data.discountPrice)
          setValue("limit", res.data.limit)
          setValue("priceLimit", res.data.priceLimit)
        })
    }
  }, []);

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);

    if (moment().diff(moment(data.expiryDate), "days") >= 0) {
      errorNotify("Date cannot be in the past")
      setIsLoading(false);
    } else  if (!isAddMode) {
      try {
        const coupon = await editCoupon(data, id!);
        successNotify(coupon.data.message)
        setIsLoading(false);
        navigate("/admin/coupons")
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setIsLoading(false);
      }
    } else {
      try {
        const coupon = await createCoupon(data);
        successNotify(coupon.data.message)
        setIsLoading(false);
        navigate("/admin/coupons")
        reset();
      } catch (e: any) {
        errorNotify(e.response.data.message);
      setIsLoading(false);
      }
    }
  });

  return (
    <div className={"page_responsive"}>
      <h3>{!isAddMode ? "Update" : "Create"} Coupon</h3>
      <div className={"create_product_btn"}>
        <Button className="all_btns" onClick={() => navigate("/admin/coupons")}>
          Back
        </Button>
      </div>
      <Container className={"mt-4"}>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              {...register("name", inputValidation.couponName)}
              placeholder="Enter Coupon Name"
            />
            <small className="text-danger">
              {errors.name && errors.name.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              {...register("code", inputValidation.couponCode)}
              placeholder="Enter Coupon Code"
            />
            <small className="text-danger">
              {errors.code && errors.code.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              {...register("discountPrice", inputValidation.discountedPrice)}
              placeholder="Enter Discount Percentage"
              min={0}
            />
            <small className="text-danger">
              {errors.discountPrice && errors.discountPrice.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              {...register("limit", inputValidation.limit)}
              placeholder="Enter Coupon Use limit"
              min={0}
            />
            <small className="text-danger">
              {errors.limit && errors.limit.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
                type="number"
                {...register("priceLimit", inputValidation.limit)}
                placeholder="Enter Order Price Limit"
                min={0}
            />
            <small className="text-danger">
              {errors.limit && errors.limit.message}
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              {...register("expiryDate", inputValidation.expiry)}
            />
            <small className="text-danger">
              {errors.expiryDate && errors.expiryDate.message}
            </small>
          </Form.Group>

          <div className="text-end">
            { !isLoading ? (
              <Button className="all_btns" type="submit">
                {!isAddMode ? "Update" : "Create"} Coupon
              </Button>
            ): <Spinner animation={"border"} />
            }
          </div>
        </Form>
      </Container>
    </div>
  );
};
export default CreateCoupons;
