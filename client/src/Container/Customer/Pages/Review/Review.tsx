import React, {useEffect, useState} from 'react'
import './../Orders/Order.scss';
import {getCurrentUserReviews} from "../../../../api/review";
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";

const Review = () => {

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        getCurrentUserReviews()
            .then((res) => {
                setIsLoading(false)
                setReviews(res.data)
            })
    }, [page])

    const columns = ["Name", "Text", "Status"];
    return (
        <div className={'page_responsive'}>
            <h3>Reviews</h3>
            <div className="table_container">
                <MuiDataTable isLoading={isLoading} data={reviews} columns={columns} page={page} setPage={setPage} />
            </div>
        </div>
    )
}
export default Review;
