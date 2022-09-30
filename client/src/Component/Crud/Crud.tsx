import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {errorNotify, successNotify} from "../../utils/toast";
import DeleteModal from "../DeleteModal/DeleteModal";
import {Button, Spinner} from "react-bootstrap";
import MuiDataTable from "../MuiDataTable/MuiDataTable";


interface IIndex {
    fetchApi: (page: number, searchText: string) => Promise<{ data: any }>
    deleteApi: (resourceId: string) => Promise<{ data: any }>,
    columns: string[],
    resourceName: string,
    editPath: string
}

const Crud:React.FC<IIndex> = (props) => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [resourceId, setResourceId] = useState<string | null>(null)


    useEffect(() => {
        setIsLoading(true);
        props.fetchApi(page, searchText)
            .then((res) => {
                setData(res.data)
                setIsLoading(false);
            })
            .catch((err: any) => {
                errorNotify(err.response.data.message)
                setIsLoading(false);
            })
    }, [page, !isFetching, searchText])

    const onDeleteHandler = () => {
        setShow(!show);
        setIsLoading(true)
        setIsFetching(true)
        props.deleteApi(resourceId!)
            .then((res) => {
                successNotify(res.data.message)
                setIsFetching(false)
                setIsLoading(false)
            }).catch((err) => {
            errorNotify(err.response.data.message)
            setIsFetching(false)
            setIsLoading(false);
        });
    }


    const openDeleteModal = (resourceId: string) => {
        setShow(!show);
        setResourceId(resourceId)
    };

    let columns = [
        {
            name: "ID",
            options: {
                display: false,
            },
        },
        ...props.columns,
        {
            name: "Actions",
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <React.Fragment>
                            <button className={'btn mx-2'}
                                    onClick={() => navigate(`/admin/create-${props.editPath}/${tableMeta.rowData[0]}`)}>
                                Edit
                            </button>
                            <button className={'btn'} onClick={() => openDeleteModal(tableMeta.rowData[0])}>
                                Delete
                            </button>
                        </React.Fragment>
                    )
                }
            },
        },
    ]


    return (
        <div className={'page_responsive'}>
            <DeleteModal
                show={show}
                onClose={() => setShow(!show)}
                onSubmit={onDeleteHandler}
            />
            <h3> { props.resourceName } </h3>

            <div className={'create_product_btn'}>
                <Button className='all_btns' onClick={() => navigate(`/admin/create-${props.editPath}`)}>Create
                    { props.resourceName }</Button>
            </div>
            {
                !isFetching ? (
                    <MuiDataTable data={data} search={true} isLoading={isLoading} setSearchText={setSearchText}
                                  columns={columns} page={page} setPage={setPage}/>
                ) : (
                    <div className="text-center">
                        <Spinner animation={"border"}/>
                    </div>
                )
            }
        </div>
    );
};

export default Crud;
