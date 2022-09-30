import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import { errorNotify, successNotify } from "../../../../../utils/toast";
import inputValidation from '../../../../../lib/Validation';
import { CreateUserInterface } from '../../../../../Interfaces'
import {useNavigate, useParams} from 'react-router-dom';
import { roleSelect } from "../../../../../api/admin/role";
import {createUsers, getUserById, updateUsers} from "../../../../../api/admin/user";
import {getAttributesById} from "../../../../../api/admin/attribute";

const CreateUser = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [roleOptions, setRoleOptions] = useState<any>([]);
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<CreateUserInterface>();
    const [isLoading, setIsLoading] = useState(false)
    const isAddMode = !id;
    useEffect(() => {
        setIsLoading(true)
        roleSelect()
          .then((role) => {
              setRoleOptions(role.data)
              if (!isAddMode) {
                  getUserById(id!)
                      .then((res) => {
                          setValue("name", res.data.name)
                          setValue("email", res.data.email)
                          setValue("phoneNumber", res.data.phoneNumber)
                          setValue("address", res.data.address)
                          setValue("role", role.data.find((role: any) => role.label == res.data.role.title))
                          setIsLoading(false)
                      })
              }
          })
        setIsLoading(false)
    }, [])

    const onSubmitHandler = handleSubmit((data) => {
        setIsLoading(true)
        if (!data.role) {
            setIsLoading(false)
            errorNotify('please select role')
        }
        else {
            let formData = {
                ...data,
                roleName: "admin",
                role: data.role.value
            }
            if (!isAddMode) {
                updateUsers(formData, id!)
                    .then((res) => {
                        setIsLoading(false)
                        successNotify(res.data.message);
                        navigate("/admin/all-users")
                        reset()
                    })
            } else {
                createUsers(formData)
                    .then((res) => {
                        setIsLoading(false)
                        successNotify(res.data.message);
                        navigate("/admin/all-users")
                        reset()
                    })
            }

        }

    })
    return (
      <div className={'page_responsive'}>
          <h3>Create User</h3>
          <Container>
              {
                  !isLoading  ?
                      (
                          <Form onSubmit={onSubmitHandler}>
                              <Row className={'profile_section'}>
                                  <Col md={9}>
                                      <Form.Group className="mb-3">
                                          <Form.Control type="text" {...register('name', inputValidation.name)} placeholder="Enter your Name" />
                                          <small className="text-danger"> {errors.name && errors.name.message} </small>
                                      </Form.Group>
                                  </Col>
                                  <Col md={9}>
                                      <Form.Group className="mb-3">
                                          <Form.Control type="email" {...register('email', inputValidation.email)} placeholder="Enter your Email" />
                                          <small className="text-danger"> {errors.email && errors.email.message} </small>
                                      </Form.Group>
                                  </Col>
                                  <Col md={9}>
                                      <Form.Group className="mb-3">
                                          <Form.Control type="number" {...register('phoneNumber', inputValidation.contactNo)} placeholder="Enter your Contact Number" />
                                          <small className="text-danger"> {errors.phoneNumber && errors.phoneNumber.message} </small>
                                      </Form.Group>
                                  </Col>
                                  <Col md={9}>
                                      <Form.Group className="mb-3">
                                          <Form.Control type="text" {...register('address', inputValidation.address)} placeholder="Enter your Address" />
                                          <small className="text-danger"> {errors.address && errors.address.message} </small>
                                      </Form.Group>
                                  </Col>

                                  <Col md={9}>
                                      <Controller
                                          name="role"
                                          control={control}
                                          render={({ field }) => {
                                              return (
                                                  <Select
                                                      {...field}
                                                      options={roleOptions}
                                                      className="basic-multi-select"
                                                      classNamePrefix="select"
                                                      placeholder="Select Role"
                                                  />
                                              );
                                          }}
                                      />
                                  </Col>

                                  <Col md={9}>
                                      <div className='text-center'>
                                              <Button className='all_btns' type="submit">
                                                  Save Changes
                                              </Button>
                                      </div>
                                  </Col>
                              </Row>
                          </Form>
                      )  : (
                          <div className="text-center">
                              <Spinner className='mt-3' animation={'border'} />
                          </div>
                      )
              }
          </Container>
      </div>
    );
};
export default CreateUser;
