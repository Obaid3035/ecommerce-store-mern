import React, {useEffect, useState} from 'react'
import './Review.scss'
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";
import {Spinner, Tab, Tabs} from 'react-bootstrap'
import {
    getAllApprovedReviews,
    getAllRejectedReviews,
    getAllReviews,
    toApprovedReview, toRejectedReview
} from "../../../../api/admin/review";
import {successNotify} from "../../../../utils/toast";

enum REVIEW_KEY {
    ALL_REVIEW = "allReview",
    APPROVED = "approved",
    REJECTED = "rejected"
}

const Review = () => {
    const [key, setKey] = useState<string>(REVIEW_KEY.ALL_REVIEW)

    const [allReviewPage, setAllReviewPage] = useState(0);
    const [approvedReviewPage, setApprovedReviewPage] = useState(0);
    const [rejectedReviewPage, setRejectedReviewPage] = useState(0);
    const [allReview, setAllReview] = useState([]);
    const [approvedReview, setApprovedReview] = useState([]);
    const [rejectedReview, setRejectedReview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        getAllReviews(allReviewPage)
            .then((res) => {
                setAllReview(res.data)
                setIsLoading(false)
            })
    }, [allReviewPage, !isFetching])

    useEffect(() => {
        setIsLoading(true)
        getAllApprovedReviews(approvedReviewPage)
            .then((res) => {
                setApprovedReview(res.data)
                setIsLoading(false)
            })
    }, [approvedReviewPage, !isFetching])

    useEffect(() => {
        setIsLoading(true)
        getAllRejectedReviews(rejectedReviewPage)
            .then((res) => {
                setRejectedReview(res.data)
                setIsLoading(false)
            })
    }, [rejectedReviewPage, !isFetching])

    const onApproveHandler = async (reviewId: string) => {
        setIsLoading(true)
        const res = await toApprovedReview(reviewId)
        successNotify(res.data.message)
        setIsLoading(false)
        setIsFetching(false)
    }

    const onRejectHandler = async (reviewId: string) => {
        setIsLoading(true)
        setIsFetching(true)
        const res = await toRejectedReview(reviewId)
        successNotify(res.data.message)
        setIsLoading(false)
        setIsFetching(false)
    }


    const columns = [{
        name: "ID",
        options: {
            display: false,
        },
    }, "Name", "Text", "Status", {
        name: "Action",
        options: {
            display: key === REVIEW_KEY.ALL_REVIEW,
            customBodyRender: (value: any, tableMeta: any) => {
                return (
                    <button className={'btn'} disabled={tableMeta.rowData[3] === "APPROVED"} onClick={() =>  onApproveHandler(tableMeta.rowData[0])}>
                        Approve
                    </button>
                )
            }
        },
    },
        {
            name: "Action",
            options: {
                display: key === REVIEW_KEY.ALL_REVIEW,
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <button className={'btn'} disabled={tableMeta.rowData[3] === "REJECTED"} onClick={() =>  onRejectHandler(tableMeta.rowData[0])}>
                            Reject
                        </button>
                    )
                }
            },
        }];


    return (
        <div className='page_responsive'>
            <h3>Review</h3>
            {
                !isLoading ? (
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => {
                            setKey(k!)
                        }}
                        className="mb-3 tabs"
                    >
                        <Tab eventKey={REVIEW_KEY.ALL_REVIEW} title="Total" className={'w-100'}>
                            <MuiDataTable title="Total Reviews" data={allReview} columns={columns} page={allReviewPage}
                                          setPage={setAllReviewPage}/>
                        </Tab>

                        <Tab eventKey={REVIEW_KEY.APPROVED} title="Approved" className={'w-100'}>
                            <MuiDataTable title="Approved Reviews" data={approvedReview} columns={columns}
                                          page={approvedReviewPage}
                                          setPage={setApprovedReviewPage}/>
                        </Tab>

                        <Tab eventKey={REVIEW_KEY.REJECTED} title="Rejected" className={'w-100'}>
                            <MuiDataTable title="Rejected Reviews" data={rejectedReview} columns={columns}
                                          page={rejectedReviewPage}
                                          setPage={setRejectedReviewPage}/>
                        </Tab>
                    </Tabs>
                ) : (
                    <div className="text-center">
                        <Spinner animation={"border"}/>
                    </div>
                )
            }
        </div>
    )
}

export default Review
