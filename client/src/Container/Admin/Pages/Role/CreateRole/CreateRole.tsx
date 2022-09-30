import React, { useEffect, useState } from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import inputValidation from "../../../../../lib/Validation";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CreatRoleInterface } from "../../../../../Interfaces";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import "./CreateRole.scss";
import { createRole, editRole, getRoleById } from "../../../../../api/admin/role";

const CreateRole = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const isAddMode = !id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreatRoleInterface>();
  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true)
    const allData = {
      title: data.title,
      ability,
    };
    if (!isAddMode) {
      try {
        const role = await editRole(allData, id!);
        successNotify(role.data.message)
        setIsLoading(false);
        navigate("/admin/role")
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setIsLoading(false);
      }
    } else {
      try {
        const role = await createRole(allData);
        successNotify(role.data.message)
        setIsLoading(false);
        navigate("/admin/role")
        reset();
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    if (!isAddMode) {
      setIsLoading(true)
      getRoleById(id!)
        .then((res) => {
          setIsLoading(false)
          setValue("title", res.data.title)
          setAbility(res.data.ability);
        })
    }
  }, [])

  const [ability, setAbility] = useState<any>({
    profile: false,
    order: false,
    coupon: false,
    shippingCost: false,
    taxes: false,
    products: false,
    categories: false,
    attributes: false,
    pictureApproval: false,
    reviewApproval: false,
    user: false,
    role: false,
    productType: false,
    colors: false,
    giftCard: false,
    giftCardHistory: false,
    editPage: false,
    seo: false,
    editMenu: false,
    graph: false
  });

  const SwitchButton = (property: string) => {
    setAbility({
      ...ability,
      [property]: !ability[property]
    })
  };

  return (
    <div className={"page_responsive"}>
      <h3>{!isAddMode ? "Update" : "Create"} Role</h3>
      <div className={"create_product_btn"}>
        <Button onClick={() => navigate("/admin/role")}>Back</Button>
      </div>
      {
        !isLoading ? (
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <label>Role Name</label>
                <Form.Control
                    {...register("title", inputValidation.roleName)}
                    type="text"
                />
                <small className="text-danger">
                  {errors.title && errors.title.message}{" "}
                </small>
              </Form.Group>

              <div className="checkbox_container">
                {
                  Object.getOwnPropertyNames(ability).map((property, index) => (
                      <span key={index}>
                { property }
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={() => SwitchButton(property)}
                            checked={!!ability[property]}
                        />
              </span>
                  ))
                }
              </div>

              <div className="d-flex justify-content-center">
                <Button className="all_btns" type="submit">
                  {!isAddMode ? "Update" : "Create"} Role
                </Button>
              </div>
            </Form>
        ) : (
            <div className="text-center">
              <Spinner animation={"border"}/>
            </div>
        )
      }
    </div>
  );
};
export default CreateRole;
