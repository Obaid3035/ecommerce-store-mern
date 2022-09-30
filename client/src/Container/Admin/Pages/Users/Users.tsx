import React from "react";
import {deleteUsers, getUsers} from "../../../../api/admin/user";
import Crud from "../../../../Component/Crud/Crud";

const Users = () => {

  const columns = ['Role',"Name","Contact No.","email" ]

    return (
        <Crud fetchApi={getUsers}
              deleteApi={deleteUsers}
              columns={columns}
              resourceName={"Users"}
              editPath={"user"}
        />
    )
}

export default Users
