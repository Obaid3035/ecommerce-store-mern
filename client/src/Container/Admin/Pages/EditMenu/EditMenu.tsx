import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {showMenu, updateMenu} from "../../../../api/seo";

const EditMenu = () => {

    const [menuInput, setMenuInput] = useState<any>({
        _id: "",
        shop: "",
        about: "",
        contact: "",
        promotion: "",
        logo: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        showMenu()
            .then((res) => {
                setMenuInput({
                    ...res.data
                })
                setIsLoading(false)
            })
    }, [])

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if (menuInput.logo) {
            const formData = new FormData();
            formData.append("shop", menuInput.shop);
            formData.append("about", menuInput.about);
            formData.append("contact", menuInput.contact);
            formData.append("promotion", menuInput.promotion);
            formData.append("logo", menuInput.logo);
            await updateMenu(formData, menuInput._id)
        } else {
            await updateMenu(menuInput, menuInput._id)
        }
        setIsLoading(false)

    }


    return (
        <div className={'page_responsive'}>
            <h4>Edit Menu</h4>
            {
                !isLoading ? (
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Shop</Form.Label>
                            <Form.Control value={menuInput.shop} type={"text"} required={true}
                                          onChange={(e) => setMenuInput({
                                              ...menuInput,
                                              shop: e.target.value
                                          })}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>About</Form.Label>
                            <Form.Control value={menuInput.about} type={"text"} required={true}
                                          onChange={(e) => setMenuInput({
                                              ...menuInput,
                                              about: e.target.value
                                          })}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control value={menuInput.contact} type={"text"} required={true}
                                          onChange={(e) => setMenuInput({
                                              ...menuInput,
                                              contact: e.target.value
                                          })}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Promotion</Form.Label>
                            <Form.Control value={menuInput.promotion} type={"text"} required={true}
                                          onChange={(e) => setMenuInput({
                                              ...menuInput,
                                              promotion: e.target.value
                                          })}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Logo</Form.Label>
                            <Form.Control type={"file"}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) => setMenuInput({
                                              ...menuInput,
                                              logo: e.target.files![0]
                                          })}/>
                            <img alt={"Logo"} src={menuInput.logo.avatar} width={400} height={100}/>
                        </Form.Group>
                        <Button type={"submit"} className={"text-center mt-4"}>Update</Button>
                    </Form>
                ) : (
                    <div className="text-center mt-4">
                        <Spinner animation={"border"}/>
                    </div>
                )
            }

        </div>
    );
};
export default EditMenu;
