import React, {useEffect, useState} from 'react';
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";
import { getGiftHistory} from "../../../../api/admin/gift";

const GiftCardHistory = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getGiftHistory(page)
            .then((res) => {
                setData(res.data)
                setIsLoading(false);
            })
    }, [page])
    const columns = [{
        name: "ID",
        options: {
            display: false,
        },
    }, "User Email", "Gift Card Name", "Gift Card Price"]

    return (
        <div className='page_responsive'>
            <h3>E-Gift Card History</h3>
            <div className="coupon_container">
                <MuiDataTable isLoading={isLoading}  search={false} data={data} columns={columns} page={page} setPage={setPage}/>
            </div>
        </div>
    );
};

export default GiftCardHistory;
