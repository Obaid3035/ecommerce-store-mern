import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import MuiDataTable from "../../../../Component/MuiDataTable/MuiDataTable";
import { Button, Spinner } from "react-bootstrap";
import { deleteRole, getRole } from "../../../../api/admin/role";
import { successNotify } from "../../../../utils/toast";

const Role = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getRole(page)
          .then((res) => {
              setData(res.data)
              setIsLoading(false);
          })
    }, [page])

    const onDeleteHandler = (roleId: string) => {
        setIsLoading(true)
        deleteRole(roleId)
          .then((res) => {
              successNotify(res.data.message)
              setIsLoading(false)
          })
    }

    let columns = [
        {
            name: "ID",
            options: {
                display: false,
            },
        },
        'Role Name',
        {
            name: "Actions",
            options: {
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <button className={'btn mr-3'} onClick={() => navigate(`/admin/edit-role/${tableMeta.rowData[0]}`)}>
                            Edit
                        </button>
                    )
                }
            },
        },
    ]

    return (
        <div className={'page_responsive'}>
            <h3> Role </h3>
            <div className={'create_product_btn'}>
                <Button className='all_btns' onClick={() => navigate('/admin/create-role')}>Create Role</Button>
            </div>
            {
                !isLoading ?
                  <MuiDataTable data={data} columns={columns} page={page} setPage={setPage} />
                  : (
                    <div className={"text-center"}>
                        <Spinner animation={"border"}/>
                    </div>
                  )
            }
        </div>
    );
};
export default Role;
