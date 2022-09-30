import React, {useEffect, useState} from 'react'
import './Order.scss';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {getCustomerOrder, toDisputedOrder} from "../../../../api/order";
import moment from "moment";
import {successNotify} from "../../../../utils/toast";
import SiteModal from "../../../../Component/SiteModal/SiteModal";
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";

const Order = () => {

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [order, setOrder] = useState([]);
    const [show, setShow] = useState(false);
    const [orderId, setOrderId] = useState<null | string>(null)
    const [message, setMessage] = useState("")
    useEffect(() => {
        setIsLoading(true)
        getCustomerOrder(page)
            .then((res) => {
                setIsLoading(false)
                setOrder(res.data)
            })
    }, [page, !isFetching])

    const navigate = useNavigate()

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            setIsFetching(true)
            await toDisputedOrder(orderId!, message);
            successNotify("If your request for return is approved, an email will be sent to you containing EGift Card")
            setShow(!show)
            setIsLoading(false)
            setIsFetching(false)
        } catch (e) {
            setShow(!show)
            setIsLoading(false)
            setIsFetching(false)
        }
    }


    const shouldDisableReturnButton = (status: string, createdAt: string) => {
        if (status === "completed") return false
        return moment().diff(moment(createdAt), "days") < 14;

    }


    const onShowHandler = (orderId: string) => {
        setOrderId(orderId);
        setShow(!show)
    }

    const columns = [{
        name: "ID",
        options: {
            display: false,
        },
    }, "Order ID", "Price", "Status", "Order Date", {
        name: "Action",
        options: {
            customBodyRender: (value: any, tableMeta: any) => {
                return (
                    <React.Fragment>
                        <button className={'btn mx-2'}
                                onClick={() => navigate(`/customer/order-details/${tableMeta.rowData[0]}`)}>
                            View
                        </button>
                        <button className={'btn mx-2'} disabled={shouldDisableReturnButton(tableMeta.rowData[3], tableMeta.rowData[4])}
                                onClick={() => onShowHandler(tableMeta.rowData[0])}>
                            Return
                        </button>
                    </React.Fragment>
                )
            }
        }
    },];
    return (
        <div className={'page_responsive'}>
            <SiteModal show={show} handleClose={() => setShow(!show)} modalTitle={"Dispute Reason"} size={"lg"}>
                <Form className={"p-4"} onSubmit={onSubmitHandler}>
                    <Form.Group className={"mb-4"}>
                        <Form.Label>Reason:</Form.Label>
                        <Form.Control type="textarea" value={message} required={true} onChange={(e) => setMessage(e.target.value)}
                                      placeholder={"Type your message"}/>
                    </Form.Group>
                    <div className={"text-center"}>
                        <Button type={"submit"}>Send</Button>
                    </div>

                </Form>
            </SiteModal>
            <h3>Orders</h3>
            <div className="table_container">
                <MuiDataTable data={order} isLoading={isLoading} search={false} columns={columns} page={page} setPage={setPage}/>
            </div>
        </div>
    )
}
export default Order;
