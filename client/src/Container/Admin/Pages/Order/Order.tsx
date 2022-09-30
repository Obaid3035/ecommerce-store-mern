import React, {useEffect, useState} from 'react';
import {Spinner, Tab, Tabs} from "react-bootstrap";
import MuiDataTable from '../../../../Component/MuiDataTable/MuiDataTable';
import {ORDER_KEY} from '../../../../Interfaces'
import {useNavigate} from 'react-router-dom'
import {
    getCancelledOrder,
    getCompletedOrder,
    getInProgressOrder,
    getOrder,
    getPendingOrder, toCancelledOrder, toCompletedOrder,
    toInProgressOrder
} from "../../../../api/admin/order";
import {errorNotify} from "../../../../utils/toast";
import {getApprovedDisputeOrder, getDisputedOrder, toApprovedDispute} from "../../../../api/admin/dispute";

const Order = () => {
    const navigate = useNavigate()
    const [key, setKey] = useState<string>(ORDER_KEY.totalOrder)
    const [allOrderPage, setAllOrderPage] = useState(0);
    const [returnOrderPage, setReturnOrderPage] = useState(0);
    const [approvedDisputeOrderPage, setApprovedDisputeOrderPage] = useState(0);
    const [pendingOrderPage, setPendingOrderPage] = useState(0);
    const [inProgressOrderPage, setInProgressOrderPage] = useState(0);
    const [cancelledOrderPage, setCancelledOrderPage] = useState(0);
    const [completedOrdersPage, setCompletedOrdersPage] = useState(0);
    const [allOrder, setAllOrder] = useState([]);
    const [returnOrder, setReturnOrder] = useState(0);
    const [pendingOrder, setPendingOrder] = useState([]);
    const [approvedDisputeOrder, setApprovedDisputeOrder] = useState(0);
    const [cancelledOrder, setCancelledOrder] = useState([]);
    const [inProgressOrder, setInProgressOrder] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false)

    const [ allOrderSearchText, setAllOrderSearchText ] = useState("");
    const [ approvedDisputeOrderSearchText, setApprovedDisputeOrderSearchText ] = useState("");
    const [ returnOrderSearchText, setReturnOrderSearchText ] = useState("");
    const [ pendingOrderSearchText, setPendingOrderSearchText ] = useState("");
    const [ inProgressOrderSearchText, setInProgressOrderSearchText ] = useState("");
    const [ completedOrderSearchText, setCompletedOrderSearchText ] = useState("");
    const [ cancelledOrderSearchText, setCancelledOrderSearchText ] = useState("");

    useEffect(() => {
        setIsLoading(true)
        getOrder(allOrderPage, allOrderSearchText)
            .then((res) => {
                setAllOrder(res.data)
                setIsLoading(false)
            })
    }, [allOrderPage, !isFetching, allOrderSearchText])


    useEffect(() => {
        setIsLoading(true)
        getApprovedDisputeOrder(approvedDisputeOrderPage, approvedDisputeOrderSearchText)
            .then((res) => {
                setApprovedDisputeOrder(res.data)
                setIsLoading(false)
            })
    }, [approvedDisputeOrderPage, !isFetching, approvedDisputeOrderSearchText])


    useEffect(() => {
        setIsLoading(true)
        getDisputedOrder(returnOrderPage, returnOrderSearchText)
            .then((res) => {
                setReturnOrder(res.data)
                setIsLoading(false)
            })
    }, [returnOrderPage, !isFetching, returnOrderSearchText])

    useEffect(() => {
        setIsLoading(true)
        getPendingOrder(pendingOrderPage, pendingOrderSearchText)
            .then((res) => {
                setPendingOrder(res.data)
                setIsLoading(false)
            })
    }, [pendingOrderPage, !isFetching, pendingOrderSearchText])

    useEffect(() => {
        setIsLoading(true)
        getInProgressOrder(inProgressOrderPage, inProgressOrderSearchText)
            .then((res) => {
                setInProgressOrder(res.data)
                setIsLoading(false)
            })
    }, [inProgressOrderPage, !isFetching, inProgressOrderSearchText])

    useEffect(() => {
        setIsLoading(true)
        getCompletedOrder(completedOrdersPage, completedOrderSearchText)
            .then((res) => {
                setCompletedOrders(res.data)
                setIsLoading(false)
            })
    }, [completedOrdersPage, !isFetching, completedOrderSearchText])

    useEffect(() => {
        setIsLoading(true)
        getCancelledOrder(cancelledOrderPage, cancelledOrderSearchText)
            .then((res) => {
                setCancelledOrder(res.data)
                setIsLoading(false)
            })
    },[cancelledOrderPage, !isFetching, cancelledOrderSearchText])

    const onAcceptOrderHandler = async (orderId: string) => {
        try {
            setIsLoading(true);
            setIsFetching(true)
            await toInProgressOrder(orderId)
            setIsLoading(false)
            setIsFetching(false)
        } catch (e: any) {
            errorNotify(e.response.data.message)
        }
    }

    const onCompleteOrderHandler = async (orderId: string) => {
        try {
            setIsLoading(true);
            setIsFetching(true)
            await toCompletedOrder(orderId)
            setIsLoading(false)
            setIsFetching(false)
        } catch (e: any) {
            errorNotify(e.response.data.message)
        }
    }

    const onCancelledOrderHandler = async (orderId: string) => {
        try {
            setIsLoading(true);
            setIsFetching(true)
            await toCancelledOrder(orderId)
            setIsLoading(false)
            setIsFetching(false)
        } catch (e: any) {
            errorNotify(e.response.data.message)
        }
    }

    const onAcceptDisputeHandler = async (orderId: string) => {
        setIsLoading(true);
        setIsFetching(true)
        await toApprovedDispute(orderId)
        setIsLoading(false)
        setIsFetching(false)
    }

    const onRejectDisputeHandler = async (orderId: string) => {
        setIsLoading(true);
        setIsFetching(true)
        await toCompletedOrder(orderId)
        setIsLoading(false)
        setIsFetching(false)
    }

    let columns = [
        {
            name: "ID",
            options: {
                display: false,
            },
        },
        "Order ID",
        'Price',
        'Status',
        'Order Date',

        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.pendingOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                            <button className={'btn mx-2'} onClick={() => onAcceptOrderHandler(tableMeta.rowData[0])}>
                                Accept
                            </button>
                            <button className={'btn'} onClick={() => onCancelledOrderHandler(tableMeta.rowData[0])}>
                                Reject
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },
        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.inProgressOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                            <button className={'btn mx-2'} onClick={() => onCompleteOrderHandler(tableMeta.rowData[0])}>
                                Completed
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },

        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.approvedDisputeOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },


        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.returnOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                            <button className={'btn mx-2'} onClick={() => onAcceptDisputeHandler(tableMeta.rowData[0])}>
                                Accept
                            </button>
                            <button className={'btn'} onClick={() => onRejectDisputeHandler(tableMeta.rowData[0])}>
                                Reject
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },

        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.completedOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },

        {
            name: "Actions",
            options: {
                display: key === ORDER_KEY.cancelledOrders,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/order-details/${tableMeta.rowData[0]}`)}>
                                View
                            </button>
                        </React.Fragment>
                    )
                }
            }
        },

    ]

    let orderTables = [
        {
            data: allOrder,
            page: allOrderPage,
            search: true,
            setPage: setAllOrderPage,
            setSearchText: setAllOrderSearchText,
            eventKey: ORDER_KEY.totalOrder,
            title: "Total"
        },
        {
            data: pendingOrder,
            page: pendingOrderPage,
            search: true,
            setPage: setPendingOrderPage,
            setSearchText: setPendingOrderSearchText,
            eventKey: ORDER_KEY.pendingOrders,
            title: "Pending"
        },
        {
            data: inProgressOrder,
            page: inProgressOrderPage,
            search: true,
            setPage: setInProgressOrderPage,
            setSearchText: setInProgressOrderSearchText,
            eventKey: ORDER_KEY.inProgressOrders,
            title: "In-Progress"
        },
        {
            data: completedOrders,
            page: completedOrdersPage,
            search: true,
            setPage: setCompletedOrdersPage,
            setSearchText: setCompletedOrderSearchText,
            eventKey: ORDER_KEY.completedOrders,
            title: "Completed"
        },

        {
            data: cancelledOrder,
            page: cancelledOrderPage,
            search: true,
            setPage: setCancelledOrderPage,
            setSearchText: setCancelledOrderSearchText,
            eventKey: ORDER_KEY.cancelledOrders,
            title: "Cancelled"
        },

        {
            data: returnOrder,
            page: returnOrderPage,
            search: true,
            setPage: setReturnOrderPage,
            setSearchText: setReturnOrderSearchText,
            eventKey: ORDER_KEY.returnOrders,
            title: "Return"
        },


        {
            data: approvedDisputeOrder,
            page: approvedDisputeOrderPage,
            search: true,
            setPage: setApprovedDisputeOrderPage,
            setSearchText: setApprovedDisputeOrderSearchText,
            eventKey: ORDER_KEY.approvedDisputeOrders,
            title: "Approved Dispute"
        },
    ]

    return (
        <div className={'page_responsive'}>
            <h3> Manage Orders </h3>

            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k!)
                }}
                className="mb-3 tabs"
            >
                {
                    orderTables.map((table, index) => (
                        <Tab eventKey={table.eventKey} title={table.title} className={'w-100'} key={index}>
                            {
                                !isFetching ? (
                                    <MuiDataTable title={table.title} search={true} isLoading={isLoading} data={table.data} columns={columns} page={table.page}
                                                  setPage={table.setPage} setSearchText={table.setSearchText}/>
                                ) : (
                                    <div className="text-center">
                                        <Spinner animation={"border"}/>
                                    </div>
                                )
                            }
                        </Tab>
                    ))
                }
            </Tabs>

        </div>
    );
};

export default Order;
