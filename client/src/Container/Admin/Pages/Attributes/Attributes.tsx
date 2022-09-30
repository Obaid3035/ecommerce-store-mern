import React from "react";
import {deleteAttributes, getAttributes} from "../../../../api/admin/attribute";
import Crud from "../../../../Component/Crud/Crud";

const Attributes = () => {
    let columns = ['Attribute Name']

    return <Crud fetchApi={getAttributes}
                  deleteApi={deleteAttributes}
                  columns={columns}
                  resourceName={"Attributes"}
                  editPath={"attributes"}
                  />
};
export default Attributes;
